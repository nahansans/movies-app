import { Platform } from 'react-native';

export const Fonts = {
    Montserrat: {
        Regular: Platform.OS == 'ios' ? 'Montserrat-Regular' : 'MontserratRegular',
        SemiBold: Platform.OS == 'ios' ? 'Montserrat-SemiBold' : 'MontserratSemiBold',
        Light: Platform.OS == 'ios' ? 'Montserrat-Light' : 'MontserratLight',
        Thin: Platform.OS == 'ios' ? 'Montserrat-Thin' : 'MontserratThin',
        Bold: Platform.OS == 'ios' ? 'Montserrat-Bold' : 'MontserratBold',
    },
    OpenSans: {
        Regular: Platform.OS == 'ios' ? 'OpenSans-Regular' : 'OpenSansRegular',
        SemiBold: Platform.OS == 'ios' ? 'OpenSans-SemiBold' : 'OpenSansSemiBold',
        Light: Platform.OS == 'ios' ? 'OpenSans-Light' : 'OpenSansLight',
        Thin: Platform.OS == 'ios' ? 'OpenSans-Thin' : 'OpenSansThin',
        Bold: Platform.OS == 'ios' ? 'OpenSans-Bold' : 'OpenSansBold',
    }
}