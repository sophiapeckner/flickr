import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { style } from "../../themes/flickr/css.js";
import {useParams} from "react-router-dom";
import {Button, FormLayout, MultiSelectComboBox, TextField} from "@vaadin/react-components";
import {useEffect, useState} from "react";
import { CustomHeader } from "../../themes/flickr/elements";
import {getMember, isLoggedIn} from "Frontend/auth";
import {getMemberById, getMemberDisplayName} from "Frontend/generated/MemberService";
import Member from "Frontend/generated/com/flickr/entities/Member";

export const config: ViewConfig = {
    menu: { order: 5, icon: "line-awesome/svg/file.svg" },
    title: "Pick Genre",
};

export default function PreferencesView() {
    let { memberId } = useParams();
    const [loggedIn, setLoggedIn] = useState(false);
    const [groupCode, setGroupCode] = useState([]);
    const [displayName, setDisplayName] = useState("");
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [streamingPlatforms, setStreamingPlatforms] = useState([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const [member, setMember] = useState<Member>();
    const [inSession, setInSession] = useState(true);

    // Retrieve every genre option available on The Movie Database
    const fetchGenres = async () => {
        try {
            const response = await fetch(
                "https://api.themoviedb.org/3/genre/movie/list?language=en",
                {
                    headers: {
                        Authorization: `Bearer ${(import.meta as any).env.VITE_MOVIE_DB_TOKEN}`,
                        accept: "application/json",
                    },
                }
            )
            const data = await response.json();
            if (data.genres) {
                return data.genres.map((genre: {name: string, id: number}) => (
                    {
                        label: genre.name,
                        value: genre.id,
                    }));
            }
        } catch (error) {
            console.error("Error fetching genres: ", error);
        }
    };

    // Retrieve every streaming platform option available on The Movie Database
    const fetchStreamingPlatforms = async () => {
        try {
            const response = await fetch(
                "https://api.themoviedb.org/3/watch/providers/movie?language=en-US",
                {
                    headers: {
                        Authorization: `Bearer ${(import.meta as any).env.VITE_MOVIE_DB_TOKEN}`,
                        accept: "application/json",
                    },
                }
            )
            const data = await response.json();
            if (data.results) {
                return data.results.map((platform: {provider_name: string, provider_id: number}) => (
                    {
                        label: platform.provider_name,
                        value: platform.provider_id,
                    }));
            }
        } catch (error) {
            console.error("Error fetching platforms: ", error);
        }
    };

    const fetchMember = async () => {
        const memberData = await getMemberById(memberId);
        setMember(memberData);

        // Check if the member is no longer part of a session
        if (memberData?.sessionId === 0) {
            setInSession(false);
        }
    };

    const fetchDisplayName = async () => {
        setDisplayName(await getMemberDisplayName(memberId ?? "") ?? "")
    }

    const fetchGroupCode = async () => {
        const response = await fetch(`/api/session/${memberId}`);
        const session = await response.json();
        setGroupCode(session.groupCode);
    }

    const fetchLogin = async () => {
        const result = await isLoggedIn();
        setLoggedIn(result);
    };

    const submit = async () => {
        await fetch(`/api/session/${memberId}/displayName`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ displayName: displayName })
        });

        // selectedGenres & selectedPlatforms are a list of objects
        // The PUT request only accepts a list of Strings as the body of the request
        // The conversion from [Object] to [String] is accomplished here:
        const selectedGenreList = selectedGenres.map((genre: { value: string }) => genre.value);
        const genreResponse = await fetch(`/api/session/${memberId}/genres`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(selectedGenreList)
        });
        if (!genreResponse.ok) {
            throw new Error(`Failed to update Session genres`);
        }

        const selectedPlatformList = selectedPlatforms.map((platform: { value: string }) => platform.value);
        const platformResponse = await fetch(`/api/session/${memberId}/platforms`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(selectedPlatformList)
        });
        if (!platformResponse.ok) {
            throw new Error(`Failed to update Session streaming platforms`);
        }

        window.location.href = `/landing/${memberId}`;
    }

    useEffect(() => {
        fetchMember();
        fetchLogin()

        if (inSession) {
            fetchGroupCode()
            fetchDisplayName()
            fetchGenres().then(setGenres)
            fetchStreamingPlatforms().then(setStreamingPlatforms)
        }
    }, [inSession, memberId, member]);

    if (!inSession) {
        return (
            <div style={{ textAlign: 'center', marginTop: '20%' }}>
                <h2>It appears that you're no longer in this session</h2>
                <Button style={{ marginTop: '20px' }} onClick={() => (window.location.href = '/start')}>
                    Join Another Group
                </Button>
            </div>
        );
    }

    useEffect(() => {
        getMember().then(r => {
            if (r) {
                // @ts-ignore
                setSelectedPlatforms(convertSavedToSelected(r.streamingPlatforms))
            }
        })
    }, []);

    const convertSavedToSelected = (saved: string[]) => {
        return saved.map((platform: string) => {
              const index = platform.indexOf(",");
              return (
                {
                    label: platform.slice(index + 1),
                    value: Number(platform.slice(0, index))
                })
          }
        )
    }

    return (
        <div style={style.outerDiv}>
            <CustomHeader confirmExit={true} loggedIn={loggedIn}/>
            <h6 style={style.groupTitle}>Group Code: </h6>
            <h3 style={style.groupCode}>{groupCode}</h3>

            <FormLayout style={style.form} responsiveSteps={ [{ minWidth: '0', columns: 1 }] }>
                <TextField
                    label="Display Name:"
                    value={displayName}
                    style={{ width: '300px' }}
                    maxlength={10}
                    onValueChanged={(e) => setDisplayName(e.detail.value)}
                />

                <MultiSelectComboBox
                    label="Select Genre(s):"
                    itemLabelPath="label"
                    itemIdPath="value"
                    items={genres}
                    style={{ width: '300px' }}
                    autoExpandVertically
                    onChange={e => setSelectedGenres(e.target.selectedItems)}
                />

                <MultiSelectComboBox
                    label="Select Streaming Platform(s):"
                    itemLabelPath="label"
                    itemIdPath="value"
                    items={streamingPlatforms}
                    style={{ width: '300px' }}
                    autoExpandVertically
                    selectedItems={selectedPlatforms}
                    onChange={e => setSelectedPlatforms(e.target.selectedItems)}
                />

                <Button onClick={submit} style={style.button}>Ready</Button>
            </FormLayout>
        </div>
    );
}
