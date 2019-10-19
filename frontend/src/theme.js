import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

let theme = createMuiTheme({
    palette: {
        primary: blue
    },
    typography:{
        // fontSize: 14
    }
})

theme = responsiveFontSizes(theme);

export default theme;