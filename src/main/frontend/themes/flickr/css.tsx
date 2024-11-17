import { colors } from "./colors.js";

export const style = {
	outerDiv: {
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
	},
	backButton: {
		height: '50px',
		margin: '15px',
		float: 'left',
		fontSize: 20,
		marginRight: 15,
	},
	topCornerButton: {
		height: "50px",
		margin: "15px",
		float: "right",
	},
  pageTitle: {
    color: colors.main, 
    textAlign: 'center',
    fontSize: '48px',
    fontFamily: 'Nunito, Verdana',
  },
  innerDiv: {
    flexDirection: 'column',
    width: '100%',
    margin: 'auto',
  },
  innerDivAddOn: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomNav: {
    width: "100%",
    backgroundColor: colors.main,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: "25px",
    position: "absolute",
    bottom: "0px",
  },
  label: {
    flexDirection: 'column',
    display: 'flex',
    marginRight: 'auto',
    width: '100%',
  },
  labelTitle: {
    marginLeft: '5%'
  },
  input: {
    width: '90%',
    height: 30,
    margin: 'auto',
    border: '1px solid black',
    marginBottom: 20,
    fontSize: 16,
    paddingLeft: 10,
    borderRadius: 8,
  },
  button: {
    width: 180,
    height: 36,
    marginRight: 'auto',
    marginLeft: 'auto',
    borderWidth: 0,
    backgroundColor: colors.main,
    color: 'white',
    textAlign: 'center',
    marginTop: 36,
    fontSize: '17px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: '80%',
    padding: 15,
  },
  authFormAddOn: {
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid grey',
    borderRadius: 8,
  },
  redirect: {
    width: '100%',
    fontSize: 16,
    marginTop: 10,
    justifyContent: 'center',
  },
  groupTitle: {
    fontSize: 20,
    textAlign: 'center',
  },
  groupCode: {
    textAlign: 'center',
    fontSize: 40,
  },
  groupChoiceButton: {
    backgroundColor: colors.main,
    height: '75px',
    width: '200px',
    color: 'white',
    fontSize: '16px',
    margin: 20,
    borderRadius: '12px',
    borderWidth: '0',
  },
}