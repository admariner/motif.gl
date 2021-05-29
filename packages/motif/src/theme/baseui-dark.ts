import { createDarkTheme } from 'baseui';
import { Theme } from 'baseui/theme';
import typography from './shared/typography';
import borders from './shared/borders';
import themeColors from './shared/themeColors';
import responsiveTheme from './shared/responsive';

const primitives = {
  // Primary Palette
  primaryA: '#FFFFFF',
  primaryB: '#24242A',
  primary: '#f8fafc',
  primary50: '#fafaff',
  primary100: '#f5f5fd',
  primary200: '#f0f0f8',
  primary300: '#e3e3eb',
  primary400: '#c1c1c9',
  primary500: '#a2a2aa',
  primary600: '#4b4b52',
  primary700: '#32323A',
  primaryFontFamily: 'Poppins',
};

const backgroundSecondary = '#292930';
const backgroundTertiary = primitives.primary700;
const textSecondary = '#8C8C97';
const borderColor = 'rgba(140, 140, 151, 0.16)';
const hoverColor = 'rgba(255, 255, 255, 0.08)';

const overrides = {
  colors: {
    // Ref: https://github.com/uber/baseweb/blob/master/src/themes/light-theme/color-semantic-tokens.js
    // Background
    backgroundPrimary: primitives.primaryB,
    backgroundSecondary,
    backgroundTertiary,
    backgroundInversePrimary: primitives.primaryA,
    backgroundInverseSecondary: primitives.primary300,

    // Replace accent palette with theme colors
    accent: themeColors.theme,
    accent50: themeColors.theme50,
    accent100: themeColors.theme100,
    accent200: themeColors.theme200,
    accent300: themeColors.theme300,
    accent400: themeColors.theme400,
    accent500: themeColors.theme500,
    accent600: themeColors.theme600,
    accent700: themeColors.theme700,

    // Map other accent colors to theme accent instead of default blue
    // https://github.com/uber/baseweb/blob/master/src/themes/dark-theme/color-semantic-tokens.js
    backgroundLightAccent: themeColors.theme700,
    contentAccent: themeColors.theme300,
    borderAccent: themeColors.theme400,
    borderAccentLight: themeColors.theme500,

    // Content
    contentPrimary: primitives.primaryA,
    contentSecondary: primitives.primary300,
    contentTertiary: primitives.primary400,
    contentInversePrimary: primitives.primaryB,
    contentInverseSecondary: primitives.primary600,
    contentInverseTertiary: primitives.primary500,

    // https://github.com/uber/baseweb/blob/master/src/themes/dark-theme/color-component-tokens.js
    modalCloseColor: primitives.primary300,
    tableFilterHeading: primitives.primary300,
    tickBorder: textSecondary,
    inputPlaceholder: primitives.primary300,
    menuFontDefault: primitives.primary300,
    // Override tooltip
    tooltipBackground: backgroundTertiary,
    tooltipText: primitives.primaryA,

    // Components
    buttonPrimaryFill: themeColors.theme,
    buttonPrimaryHover: themeColors.theme400,
    buttonPrimaryActive: themeColors.theme700,
    buttonPrimarySelectedFill: themeColors.theme700,
    buttonPrimaryText: primitives.primaryA,
    buttonPrimarySelectedText: primitives.primaryA,
    buttonSecondaryFill: primitives.primary700,
    buttonSecondaryHover: primitives.primary600,
    buttonSecondaryActive: backgroundSecondary,
    buttonSecondarySelectedFill: backgroundSecondary,
    listHeaderFill: backgroundSecondary,
    listBodyFill: backgroundTertiary,
    inputBorder: borderColor,
    inputFill: backgroundTertiary,
    inputFillActive: backgroundTertiary,
    menuFill: backgroundTertiary,
    menuFillHover: hoverColor,
    tagPrimarySolidBackground: themeColors.theme,
    tagPrimarySolidFont: primitives.primaryA,
    tagPrimaryOutlinedBackground: themeColors.theme,
    toggleFill: themeColors.theme,
    toggleFillChecked: themeColors.theme300,
    tickFillSelected: themeColors.theme,
    tickFillSelectedHover: themeColors.theme300,
    tickFillSelectedHoverActive: themeColors.theme300,
    fileUploaderBackgroundColor: backgroundTertiary,
    fileUploaderBorderColorActive: borderColor,
    borderFocus: themeColors.theme,
  },
  typography,
  borders,
};

const DarkTheme = createDarkTheme(primitives, overrides);
const MotifDarkTheme: Theme = { ...DarkTheme, ...responsiveTheme };

export default MotifDarkTheme;
