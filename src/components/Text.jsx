import { Text as NativeText, StyleSheet } from "react-native";

import theme from "../theme";

const styles = StyleSheet.create({
    text: {
        color: theme.colors.textPrimary,
        fontSize: theme.fontSizes.body,
        fontFamily: theme.fonts.main,
        fontWeight: theme.fontWeights.normal
    },
    coloTextSecondary: {
        color: theme.colors.textSecondary
    },
    colorPrimary: {
        color: theme.colors.primary
    },
    fontSizeSubHeading: {
        fontSize: theme.fontSizes.subheading
    },
    fontWeightBold: {
        fontWeight: theme.fontWeights.bold
    }
});

const Text = ({ color, fontSize, fontWeight, style, ...props }) => {
    const textStyle = [
        styles.text,
        color === "textSecondary" && styles.coloTextSecondary,
        color === "primary" && styles.colorPrimary,
        fontSize === "subheading" && styles.fontSizeSubHeading,
        fontWeight === "bold" && styles.fontWeightBold,
        style
    ];

    return <NativeText style={textStyle} {...props} />
};

export default Text;