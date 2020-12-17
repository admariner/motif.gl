import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { getTrackBackground } from 'react-range';
import { useStyletron } from 'baseui';
import {
  Slider as BaseSlider,
  SliderProps as BaseSliderProps,
} from 'baseui/slider';

interface SliderProps extends BaseSliderProps {
  showThumbValue?: boolean;
  showTickBar?: boolean;
}

const Slider = (props: SliderProps) => {
  const { showThumbValue = true, showTickBar = true, ...rest } = props;
  const [css, theme] = useStyletron();
  return (
    <BaseSlider
      {...rest}
      overrides={{
        Thumb: {
          style: ({ $theme }) => {
            return {
              height: '12px',
              width: '12px',
              // modify to border: 0 will breaks atomic rendering
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              backgroundColor: $theme.colors.primary,
              color: $theme.colors.contentPrimary,
              display: 'flex',
              outline: 'none',
              justifyContent: 'center',
              alignItems: 'center',
              borderLeftColor: $theme.colors.mono400,
              borderRightColor: $theme.colors.mono400,
              borderTopColor: $theme.colors.mono400,
              borderBottomColor: $theme.colors.mono400,
            };
          },
        },
        ThumbValue: {
          style: ({ $theme }) => {
            return {
              display: showThumbValue ? 'block' : 'none',
              position: 'absolute',
              backgroundColor: 'transparent',
              top: `-${$theme.sizing.scale700}`,
              ...$theme.typography.font200,
              color: $theme.colors.contentPrimary,
              padding: 0,
              // modify to border: 0 will breaks atomic rendering
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            };
          },
        },
        InnerTrack: {
          style: ({ $theme, $value = [], $min, $max, $disabled }) => {
            const { colors, direction } = $theme;
            return {
              height: '3px',
              background: getTrackBackground({
                values: $value,
                colors:
                  $value.length === 1
                    ? [
                        $disabled
                          ? colors.borderOpaque
                          : colors.contentTertiary,
                        $disabled
                          ? colors.backgroundSecondary
                          : colors.borderOpaque,
                      ]
                    : [
                        $disabled
                          ? colors.backgroundSecondary
                          : colors.borderOpaque,
                        $disabled
                          ? colors.borderOpaque
                          : colors.contentTertiary,
                        $disabled
                          ? colors.backgroundSecondary
                          : colors.borderOpaque,
                      ],
                min: $min || 0,
                max: $max || 0,
                rtl: direction === 'rtl',
              }),
            };
          },
        },
        Track: {
          style: ({ $theme }) => {
            return {
              paddingBottom: $theme.sizing.scale200,
              paddingLeft: 0,
              paddingRight: 0,
            };
          },
        },
        TickBar: ({ $min, $max }) => (
          <div
            className={css({
              display: showTickBar ? 'flex' : 'none',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: theme.colors.contentPrimary,
              ...theme.typography.font200,
            })}
          >
            <div>{$min}</div>
            <div>{$max}</div>
          </div>
        ),
        InnerThumb: () => null,
      }}
    />
  );
};

export default Slider;
