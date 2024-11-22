import { colors } from "./colors.js";

export const style = {
	outerDiv: {
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
	},
	backButton: {
		height: '25px',
    maxWidth: 50,
		margin: '20px',
		float: 'left',
		fontSize: 20,
		marginRight: 15,
    color: colors.main
	},
	topCornerButton: {
		height: "25px",
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
    marginTop: "auto",
    bottom: "0px",
  },
  navBarItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'white',
    width: 75,
    fontSize: 12,
    padding: 16
  },
  navBarIcon: {
    marginBottom: 4,
    fontSize: 20,
  },
  label: {
    marginRight: 'auto', 
    marginLeft: '5%'
  },
  input: {
    width: '90%',
    margin: 'auto',
    // marginBottom: 20,
    fontSize: 16,
    borderRadius: 8,
  },
  button: {
    backgroundColor: colors.main,
    color: 'white',
    textAlign: 'center',
    // borderRadius: 8,
    width: '90%',
    // marginLeft: '5%',
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 0,
    height: 30,
    fontSize: 16,
    cursor: 'pointer',
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
    color: 'white',
    textAlign: 'center',
    // borderRadius: 8,
    width: '60%',
    marginLeft: '20%',
    marginTop: 20,
    marginBottom: 'auto',
    height: 30,
    fontSize: 16,
    cursor: 'pointer',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: '80%',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formAddOn: {
    border: '1px solid grey',
    borderRadius: 8,
    marginBottom: 20
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