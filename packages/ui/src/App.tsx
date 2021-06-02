/* eslint-disable no-alert */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { BaseProvider } from 'baseui';
import { Block } from 'baseui/block';
// import { Button } from 'baseui/button';
import * as icon from 'baseui/icon';
import { Tag, KIND, VARIANT } from 'baseui/tag';
import { Notification } from 'baseui/notification';
import { Toast, KIND as TOASTKIND } from 'baseui/toast';
import { StatefulTooltip } from 'baseui/tooltip';
import { StatefulPopover } from 'baseui/popover';
import { FormControl } from 'baseui/form-control';
import { StatefulMenu } from 'baseui/menu';
import { StatefulSelect } from 'baseui/select';
import { Input } from 'baseui/input';
import { StatefulCheckbox, STYLE_TYPE } from 'baseui/checkbox';
import { FileUploader } from 'baseui/file-uploader';
import { ListItem, ListItemLabel } from 'baseui/list';
import { Radio, StatefulRadioGroup } from 'baseui/radio';
import { StatefulTabs, Tab } from 'baseui/tabs-motion';
import { StatefulDatePicker } from 'baseui/datepicker';
import { ProgressBar } from 'baseui/progress-bar';
import { Spinner } from 'baseui/spinner';
import { Skeleton } from 'baseui/skeleton';
import { Accordion, Panel } from 'baseui/accordion';
import * as typo from 'baseui/typography';
import { Timing, Easing } from './BaseuiTheming/animations';
import { Border, Radius } from './BaseuiTheming/borders';
import { Breakpoint } from './BaseuiTheming/breakpoints';
import { Color } from './BaseuiTheming/colors';
import { Grid } from './BaseuiTheming/grid';
import { Lighting } from './BaseuiTheming/lighting';
import { Sizing } from './BaseuiTheming/sizing';
import { Type } from './BaseuiTheming/typography';
import MotifDarkTheme from './theme/baseui-dark';
import MotifLightTheme from './theme/baseui-light';
import SearchTabs from './component/SearchTabs';
import Button from './component/Button';
import Dropdown from './component/Dropdown';
import Slider from './component/Slider';
import ProgressStepper from './component/ProgressStepper';

const engine = new Styletron();

const App = () => (
  <StyletronProvider value={engine}>
    <BaseProvider theme={MotifDarkTheme}>
      <typo.HeadingLarge marginLeft='10%'>Component Gallery</typo.HeadingLarge>
      <Block
        backgroundColor='#080808'
        color='contentPrimary'
        marginTop='60px'
        marginRight='20%'
        marginLeft='10%'
      >
        <StatefulTabs orientation='vertical'>
          <Tab title='Input Components'>
            <InputComponents />
          </Tab>
          <Tab title='Picker Components'>
            <PickerComponents />
          </Tab>
          <Tab title='Content Components'>
            <ContentComponents />
          </Tab>
          <Tab title='Progress Components'>
            <ProgressComponents />
          </Tab>
          <Tab title='Typography Components'>
            <TypographyComponents />
          </Tab>
          <Tab title='Base Tokens'>
            <BaseTokens />
          </Tab>
        </StatefulTabs>
      </Block>
    </BaseProvider>
  </StyletronProvider>
);

const PickerComponents = () => (
  <>
    <typo.HeadingLarge> Pickers </typo.HeadingLarge>
    <Block
      display='flex'
      flexDirection='column'
      gridGap='10px'
      maxWidth='1000px'
      paddingLeft='18px'
    >
      <FormControl
        label={() => 'Input with label and caption using form control'}
        caption={() => 'caption'}
      >
        <Input size='compact' />
      </FormControl>
      <Block display='flex' gridGap='20px'>
        <Block width='300px'>
          <typo.LabelSmall> Datepicker </typo.LabelSmall>
          <StatefulDatePicker size='compact' />
        </Block>
        <Block width='300px'>
          <typo.LabelSmall> Select </typo.LabelSmall>
          <StatefulSelect
            options={[
              { label: 'AliceBlue', id: '#F0F8FF' },
              { label: 'AntiqueWhite', id: '#FAEBD7' },
              { label: 'Aqua', id: '#00FFFF' },
              { label: 'Aquamarine', id: '#7FFFD4' },
              { label: 'Azure', id: '#F0FFFF' },
              { label: 'Beige', id: '#F5F5DC' },
            ]}
            placeholder='Select color'
            size='compact'
          />
        </Block>
        <Block width='400px'>
          <typo.LabelSmall> Multi-Select </typo.LabelSmall>
          <StatefulSelect
            options={[
              { label: 'AliceBlue', id: '#F0F8FF' },
              { label: 'AntiqueWhite', id: '#FAEBD7' },
              { label: 'Aqua', id: '#00FFFF' },
              { label: 'Aquamarine', id: '#7FFFD4' },
              { label: 'Azure', id: '#F0FFFF' },
              { label: 'Beige', id: '#F5F5DC' },
            ]}
            initialState={{
              value: [
                { label: 'Azure', id: '#F0FFFF' },
                { label: 'Beige', id: '#F5F5DC' },
              ],
            }}
            multi
            size='compact'
          />
        </Block>
      </Block>
      <Block display='flex' gridGap='20px'>
        <Block width='300px'>
          <typo.LabelSmall> Regular Dropdown </typo.LabelSmall>
          <Dropdown
            options={[
              { label: 'AliceBlue', id: '#F0F8FF' },
              { label: 'AntiqueWhite', id: '#FAEBD7' },
              { label: 'Aqua', id: '#00FFFF' },
              { label: 'Aquamarine', id: '#7FFFD4' },
              { label: 'Azure', id: '#F0FFFF' },
              { label: 'Beige', id: '#F5F5DC' },
            ]}
          />
        </Block>
        <Block width='300px'>
          <typo.LabelSmall> Transparent Dropdown </typo.LabelSmall>
          <Dropdown
            transparent
            options={[
              { label: 'AliceBlue', id: '#F0F8FF' },
              { label: 'AntiqueWhite', id: '#FAEBD7' },
              { label: 'Aqua', id: '#00FFFF' },
              { label: 'Aquamarine', id: '#7FFFD4' },
              { label: 'Azure', id: '#F0FFFF' },
              { label: 'Beige', id: '#F5F5DC' },
            ]}
          />
        </Block>
        <Block width='400px'>
          <typo.LabelSmall> Multi-select dropdown </typo.LabelSmall>
          <Dropdown
            options={[
              { label: 'AliceBlue', id: '#F0F8FF' },
              { label: 'AntiqueWhite', id: '#FAEBD7' },
              { label: 'Aqua', id: '#00FFFF' },
              { label: 'Aquamarine', id: '#7FFFD4' },
              { label: 'Azure', id: '#F0FFFF' },
              { label: 'Beige', id: '#F5F5DC' },
            ]}
            initialState={{
              value: [
                { label: 'Azure', id: '#F0FFFF' },
                { label: 'Beige', id: '#F5F5DC' },
              ],
            }}
            multi
          />
        </Block>
      </Block>
      <Block display='flex' gridGap='20px'>
        <Block width='400px'>
          <typo.LabelSmall marginBottom='4px'> Slider </typo.LabelSmall>
          <Slider showThumbValue showTickBar />
        </Block>
        <Block width='400px'>
          <typo.LabelSmall marginBottom='4px'> Range Slider </typo.LabelSmall>
          <Slider
            showThumbValue
            showTickBar
            initialState={{ value: [20, 50] }}
          />
        </Block>
      </Block>
      <Block display='flex' gridGap='20px'>
        <Block width='400px'>
          <typo.LabelSmall> FileUploader </typo.LabelSmall>
          <FileUploader />
        </Block>
        <Block width='400px'>
          <typo.LabelSmall> Menu </typo.LabelSmall>
          <StatefulMenu
            items={[
              { label: 'Item One' },
              { label: 'Item Two' },
              { label: 'Item Three' },
              { label: 'Item Four' },
            ]}
          />
        </Block>
      </Block>
    </Block>
  </>
);

const InputComponents = () => (
  <>
    <typo.HeadingLarge> Inputs </typo.HeadingLarge>
    <Block
      display='flex'
      flexDirection='column'
      gridGap='10px'
      paddingLeft='18px'
    >
      <typo.ParagraphMedium>
        Buttons - use compact size (height - 32px) as default and square shape
        for standalone icons
      </typo.ParagraphMedium>
      <typo.LabelSmall> Primary Button </typo.LabelSmall>
      <Block display='flex' gridGap='10px'>
        <Button kind='primary' size='compact'>
          {' '}
          Primary Button{' '}
        </Button>
        <Button kind='primary' size='compact' isLoading>
          Loading State
        </Button>
        <Button kind='primary' size='compact' isSelected>
          Selected State
        </Button>
        <Button kind='primary' size='compact' disabled>
          Disabled State
        </Button>
      </Block>
      <typo.LabelSmall> Secondary Button </typo.LabelSmall>
      <Block display='flex' gridGap='10px'>
        <Button kind='secondary' size='compact'>
          {' '}
          Secondary Button{' '}
        </Button>
        <Button kind='secondary' size='compact' isLoading>
          {' '}
          Loading State{' '}
        </Button>
        <Button kind='secondary' size='compact' isSelected>
          {' '}
          Selected State{' '}
        </Button>
        <Button kind='secondary' size='compact' disabled>
          {' '}
          Disabled State{' '}
        </Button>
      </Block>
      <typo.LabelSmall> Tertiary Button </typo.LabelSmall>
      <Block display='flex' gridGap='10px'>
        <Button kind='tertiary' size='compact'>
          {' '}
          Tertiary Button{' '}
        </Button>
        <Button kind='tertiary' size='compact' isLoading>
          {' '}
          Loading State{' '}
        </Button>
        <Button kind='tertiary' size='compact' isSelected>
          {' '}
          Selected State{' '}
        </Button>
        <Button kind='tertiary' size='compact' disabled>
          {' '}
          Disabled State{' '}
        </Button>
      </Block>
      <typo.LabelSmall> Icon Buttons</typo.LabelSmall>
      <Block display='flex' gridGap='10px'>
        <br />
        <Button shape='square' size='compact'>
          <icon.Plus size={18} />
        </Button>
        <Button kind='secondary' shape='square' size='compact'>
          <icon.Check size={18} />
        </Button>
        <Button kind='tertiary' shape='square' size='compact'>
          <icon.ChevronDown size={18} />
        </Button>
        <Button
          startEnhancer={() => <icon.ArrowRight size={18} />}
          size='compact'
        >
          Start Enhancer
        </Button>
        <Button
          endEnhancer={() => <icon.Upload size={18} />}
          kind='secondary'
          size='compact'
        >
          End Enhancer
        </Button>
      </Block>
      <typo.LabelSmall> Border Button </typo.LabelSmall>
      <Block display='flex' gridGap='10px'>
        <br />
        <Button border='solid' size='compact' kind='secondary' shape='square'>
          <icon.Plus size={18} />
        </Button>
        <Button border='solid' size='compact' kind='secondary'>
          Border Secondary
        </Button>
        <Button border='solid' size='compact' kind='tertiary'>
          Border Tertiary
        </Button>
        <Button
          border='solid'
          size='compact'
          kind='secondary'
          startEnhancer={() => <icon.Plus size={18} />}
        >
          Import Data
        </Button>
        <Button border='solid' size='compact' kind='secondary' disabled>
          Disabled State
        </Button>
      </Block>
      <typo.LabelSmall> Full Width Button</typo.LabelSmall>
      <Block width='500px'>
        <Button border='solid' width='100%'>
          Width=100%
        </Button>
      </Block>
      <Block display='flex'>
        <Block width='200px'>
          <typo.LabelSmall> Checkbox </typo.LabelSmall>
          <StatefulCheckbox> click me </StatefulCheckbox>
          <StatefulCheckbox initialState={{ checked: true }}>
            checked
          </StatefulCheckbox>
          <StatefulCheckbox checkmarkType={STYLE_TYPE.toggle_round}>
            toggle me
          </StatefulCheckbox>
          <StatefulCheckbox
            checkmarkType={STYLE_TYPE.toggle_round}
            initialState={{ checked: true }}
          >
            toggled
          </StatefulCheckbox>
        </Block>
        <Block width='300px'>
          <typo.LabelSmall> Radio Groups </typo.LabelSmall>
          <StatefulRadioGroup name='stateful' initialState={{ value: '2' }}>
            <Radio value='1'>First</Radio>
            <Radio value='2'>Second</Radio>
            <Radio value='3'>Third</Radio>
          </StatefulRadioGroup>
        </Block>
      </Block>
    </Block>
  </>
);

const ContentComponents = () => (
  <>
    <typo.HeadingLarge> Navigation / Content </typo.HeadingLarge>
    <Block
      display='flex'
      flexDirection='column'
      gridGap='10px'
      maxWidth='1000px'
      paddingLeft='18px'
    >
      <Block display='flex' gridGap='20px'>
        <Block width='400px'>
          <typo.LabelSmall> Tabs (motion) </typo.LabelSmall>
          <StatefulTabs>
            <Tab title='First'>I must not fear.</Tab>
            <Tab title='Second'>Fear is the mind-killer.</Tab>
            <Tab title='Third'>
              Fear is the little-death that brings total obliteration.
            </Tab>
          </StatefulTabs>
        </Block>
        <Block width='400px'>
          <typo.LabelSmall> Tabs (motion) Fixed fill </typo.LabelSmall>
          <SearchTabs
            items={[
              {
                key: 1,
                title: 'First',
                content: 'I must not fear',
              },
              {
                key: 2,
                title: 'Second',
                content: 'Fear is the mind-killer.',
              },
              {
                key: 3,
                title: 'Third',
                content:
                  'Fear is the little-death that brings total obliteration.',
              },
            ]}
          />
        </Block>
        <Block width='400px'>
          <typo.LabelSmall> Accordion </typo.LabelSmall>
          <Accordion>
            <Panel title='Panel 1'>Content 1</Panel>
            <Panel title='Panel 2'>Content 2</Panel>
            <Panel title='Panel 3'>Content 3</Panel>
          </Accordion>
        </Block>
      </Block>
      <Block
        display='flex'
        flexDirection='column'
        gridGap='10px'
        maxWidth='800px'
      >
        <Block display='flex' gridGap='20px'>
          <Block width='400px'>
            <typo.LabelSmall marginBottom='24px' marginTop='24px'>
              {' '}
              Tooltip{' '}
            </typo.LabelSmall>
            <StatefulTooltip
              content={() => <Block padding='20px'>Hello, there! 👋</Block>}
              returnFocus
              autoFocus
            >
              Hover me
            </StatefulTooltip>
          </Block>
          <Block width='400px'>
            <typo.LabelSmall marginBottom='24px' marginTop='24px'>
              {' '}
              Popover{' '}
            </typo.LabelSmall>
            <StatefulPopover
              content={() => (
                <Block padding='20px'>
                  Hello, there! 👋 <Input placeholder='Focusable Element' />
                </Block>
              )}
              returnFocus
              autoFocus
            >
              <Button>Click me</Button>
            </StatefulPopover>
          </Block>
        </Block>
      </Block>

      <Block display='flex' gridGap='20px'>
        <Block width='400px'>
          <typo.LabelSmall> List </typo.LabelSmall>
          <ListItem>
            <ListItemLabel>Label One</ListItemLabel>
          </ListItem>
          <ListItem>
            <ListItemLabel>Label Two</ListItemLabel>
          </ListItem>
          <ListItem>
            <ListItemLabel description='description'>Label Three</ListItemLabel>
          </ListItem>
          <ListItem>
            <ListItemLabel description='description'>Label Four</ListItemLabel>
          </ListItem>
        </Block>
        <Block width='400px'>
          <typo.LabelSmall marginTop='24px' marginBottom='18px'>
            {' '}
            Tag{' '}
          </typo.LabelSmall>
          <React.Fragment>
            {[
              KIND.primary,
              KIND.accent,
              KIND.positive,
              KIND.negative,
              KIND.warning,
            ].map((kind) => (
              <div key={kind}>
                <Tag
                  kind={kind}
                  onClick={() => alert(`click ${kind}`)}
                  onActionClick={() => alert(`action ${kind}`)}
                >
                  {kind}
                </Tag>
                <Tag
                  kind={kind}
                  onClick={() => alert(`click ${kind}`)}
                  onActionClick={() => alert(`action ${kind}`)}
                  variant={VARIANT.solid}
                >
                  {kind}
                </Tag>
              </div>
            ))}
          </React.Fragment>
        </Block>
      </Block>
    </Block>
  </>
);

const ProgressComponents = () => {
  const [currentStep, setCurrentStep] = React.useState(1);

  return (
    <>
      <typo.HeadingLarge> Progress and Validation </typo.HeadingLarge>
      <Block
        display='flex'
        flexDirection='column'
        gridGap='10px'
        maxWidth='1000px'
        paddingLeft='18px'
      >
        <Block display='flex' gridGap='20px'>
          <Block width='400px'>
            <typo.LabelSmall> Notification </typo.LabelSmall>
            <Notification>{() => 'This is a notification.'}</Notification>
            <Notification kind={TOASTKIND.positive}>
              Positive notification
            </Notification>
            <Notification kind={TOASTKIND.warning}>
              Warning notification
            </Notification>
            <Notification kind={TOASTKIND.negative}>
              Negative notification
            </Notification>
          </Block>
          <Block width='400px'>
            <typo.LabelSmall> Toast </typo.LabelSmall>
            <Toast>Default info notification</Toast>
            <Toast kind={TOASTKIND.positive}>Positive notification</Toast>
            <Toast kind={TOASTKIND.warning}>Warning notification</Toast>
            <Toast kind={TOASTKIND.negative}>Negative notification</Toast>
          </Block>
        </Block>
        <Block width='500px'>
          <typo.LabelSmall> Progress Stepper </typo.LabelSmall>
          <ProgressStepper
            currentStep={currentStep}
            onStepChange={(step) => {
              setCurrentStep(step);
            }}
            items={[
              {
                children: '1. Connect Database',
                disabled: currentStep > 0,
              },
              {
                children: '2. Execute Query',
                disabled: currentStep > 1,
              },
              {
                children: '3. Configure Fields',
                disabled: currentStep > 2,
              },
            ]}
          />
        </Block>
        <Block width='200px' display='flex' gridGap='20px'>
          <Button
            onClick={() => setCurrentStep((step) => step - 1)}
            kind='secondary'
          >
            {' '}
            prev step
          </Button>
          <Button onClick={() => setCurrentStep((step) => step + 1)}>
            {' '}
            next step
          </Button>
        </Block>
        <Block display='flex' gridGap='20px'>
          <Block width='300px'>
            <typo.LabelSmall> Progress Bar </typo.LabelSmall>
            <ProgressBar value={50} successValue={100} />
          </Block>
          <Block width='300px'>
            <typo.LabelSmall> Skeleton </typo.LabelSmall>
            <Skeleton height='100px' width='200px' animation />
          </Block>
          <Block width='300px'>
            <typo.LabelSmall> Spinner </typo.LabelSmall>
            <Spinner />
          </Block>
        </Block>
      </Block>
    </>
  );
};

const TypographyComponents = () => (
  <>
    <typo.HeadingLarge> Typography </typo.HeadingLarge>

    <typo.DisplayLarge> Display Large </typo.DisplayLarge>
    <typo.DisplayMedium> Display Medium </typo.DisplayMedium>
    <typo.DisplaySmall> Display Small </typo.DisplaySmall>
    <typo.DisplayXSmall> Display XSmall </typo.DisplayXSmall>
    <typo.HeadingXXLarge> Heading XXLarge (H1) </typo.HeadingXXLarge>
    <typo.HeadingXLarge> Heading XLarge (H2) </typo.HeadingXLarge>
    <typo.HeadingLarge> Heading Large (H3) </typo.HeadingLarge>
    <typo.HeadingMedium> Heading Medium (H4) </typo.HeadingMedium>
    <typo.HeadingSmall> Heading Small (H5) </typo.HeadingSmall>
    <typo.HeadingXSmall> Heading XSmall (H6) </typo.HeadingXSmall>
    <typo.LabelLarge> Label Large </typo.LabelLarge>
    <typo.LabelSmall> Label Medium </typo.LabelSmall>
    <typo.LabelSmall> Label Small </typo.LabelSmall>
    <typo.LabelXSmall> Label XSmall </typo.LabelXSmall>
    <typo.ParagraphLarge> Paragraph Large </typo.ParagraphLarge>
    <typo.ParagraphMedium> Paragraph Medium </typo.ParagraphMedium>
    <typo.ParagraphSmall> Paragraph Small </typo.ParagraphSmall>
    <typo.ParagraphXSmall> Paragraph XSmall </typo.ParagraphXSmall>
  </>
);

const BaseTokens = () => (
  <Block maxWidth='800px'>
    <typo.HeadingLarge> Theme Properties </typo.HeadingLarge>
    The theme object organizes its various properties according to their
    respective concerns.
    <typo.HeadingMedium> Animation </typo.HeadingMedium>
    Control animation durations and easing functions.
    <Timing name='timing100' />
    <Timing name='timing200' />
    <Timing name='timing300' />
    <Timing name='timing400' />
    <Timing name='timing500' />
    <Timing name='timing600' />
    <Timing name='timing700' />
    <Timing name='timing800' />
    <Timing name='timing900' />
    <Timing name='timing1000' />
    <Easing name='easeOutCurve' />
    <Easing name='easeInCurve' />
    <Easing name='easeInOutCurve' />
    <Easing name='easeInQuinticCurve' />
    <Easing name='easeOutQuinticCurve' />
    <Easing name='easeInOutQuinticCurve' />
    <Easing name='linearCurve' />
    <typo.HeadingMedium> Borders </typo.HeadingMedium>
    Control border and border radius styles.
    <Border name='border100' />
    <Border name='border200' />
    <Border name='border300' />
    <Border name='border400' />
    <Border name='border500' />
    <Border name='border600' />
    <Radius name='radius100' />
    <Radius name='radius200' />
    <Radius name='radius300' />
    <Radius name='radius400' />
    <typo.HeadingMedium> Breakpoints </typo.HeadingMedium>
    Control the media query widths used to establish responsive breakpoints.
    <Breakpoint name='small' />
    <Breakpoint name='medium' />
    <Breakpoint name='large' />
    <typo.HeadingMedium> Colors </typo.HeadingMedium>
    Control literal and semantic color values. These differ between light and
    dark themes.
    <Color name='primaryA' />
    <Color name='primaryB' />
    <Color name='accent' />
    <Color name='negative' />
    <Color name='warning' />
    <Color name='positive' />
    <Color name='backgroundPrimary' />
    <Color name='backgroundSecondary' />
    <Color name='backgroundTertiary' />
    <Color name='backgroundInversePrimary' />
    <Color name='backgroundInverseSecondary' />
    <Color name='contentPrimary' />
    <Color name='contentSecondary' />
    <Color name='contentTertiary' />
    <Color name='contentInversePrimary' />
    <Color name='contentInverseSecondary' />
    <Color name='contentInverseTertiary' />
    <Color name='borderOpaque' />
    <Color name='borderTransparent' />
    <Color name='borderSelected' />
    <Color name='borderInverseOpaque' />
    <Color name='borderInverseTransparent' />
    <Color name='borderInverseSelected' />
    <Color name='backgroundStateDisabled' />
    <Color name='backgroundOverlayDark' />
    <Color name='backgroundOverlayLight' />
    <Color name='backgroundAccent' />
    <Color name='backgroundNegative' />
    <Color name='backgroundWarning' />
    <Color name='backgroundPositive' />
    <Color name='backgroundLightAccent' />
    <Color name='backgroundLightNegative' />
    <Color name='backgroundLightWarning' />
    <Color name='backgroundLightPositive' />
    <Color name='backgroundAlwaysDark' />
    <Color name='backgroundAlwaysLight' />
    <Color name='contentStateDisabled' />
    <Color name='contentAccent' />
    <Color name='borderAccentLight' />
    <Color name='contentNegative' />
    <Color name='contentWarning' />
    <Color name='contentPositive' />
    <Color name='contentOnColor' />
    <Color name='borderStateDisabled' />
    <Color name='borderAccent' />
    <Color name='borderNegative' />
    <Color name='borderWarning' />
    <Color name='borderPositive' />
    The following colors are "primitive" colors used to construct the theme when
    using `createTheme`. We make them available directly on the `theme.colors`
    object for your convenience.
    <Color name='primaryA' />
    <Color name='primaryB' />
    <Color name='primary' />
    <Color name='primary50' />
    <Color name='primary100' />
    <Color name='primary200' />
    <Color name='primary300' />
    <Color name='primary400' />
    <Color name='primary500' />
    <Color name='primary600' />
    <Color name='primary700' />
    <Color name='accent' />
    <Color name='accent50' />
    <Color name='accent100' />
    <Color name='accent200' />
    <Color name='accent300' />
    <Color name='accent400' />
    <Color name='accent500' />
    <Color name='accent600' />
    <Color name='accent700' />
    <Color name='negative' />
    <Color name='negative50' />
    <Color name='negative100' />
    <Color name='negative200' />
    <Color name='negative300' />
    <Color name='negative400' />
    <Color name='negative500' />
    <Color name='negative600' />
    <Color name='negative700' />
    <Color name='warning' />
    <Color name='warning50' />
    <Color name='warning100' />
    <Color name='warning200' />
    <Color name='warning300' />
    <Color name='warning400' />
    <Color name='warning500' />
    <Color name='warning600' />
    <Color name='warning700' />
    <Color name='positive' />
    <Color name='positive50' />
    <Color name='positive100' />
    <Color name='positive200' />
    <Color name='positive300' />
    <Color name='positive400' />
    <Color name='positive500' />
    <Color name='positive600' />
    <Color name='positive700' />
    <Color name='white' />
    <Color name='black' />
    <Color name='mono100' />
    <Color name='mono200' />
    <Color name='mono300' />
    <Color name='mono400' />
    <Color name='mono500' />
    <Color name='mono600' />
    <Color name='mono700' />
    <Color name='mono800' />
    <Color name='mono900' />
    <Color name='mono1000' />
    <Color name='rating200' />
    <Color name='rating400' />
    The `theme.colors` object also includes component specific properties. We
    won't enumerate those here since you should rarely need to reference them
    yourself. The best way to explore component specific properties is to go to
    a component's documentation page and use the sandbox at the top of the page.
    There is an interactive **Theme** tab which lets you dynamically change any
    property relevant to the component.
    <typo.HeadingMedium> Direction </typo.HeadingMedium>
    Control the
    [`dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
    for components. It can be `auto`, `rtl`, or `ltr`.
    <typo.HeadingMedium> Grid </typo.HeadingMedium>
    Control the columns and gutters for [`LayoutGrid`](/components/layout-grid).
    <Grid />
    <typo.HeadingMedium> Lighting </typo.HeadingMedium>
    Control shadows.
    <Lighting name='shadow400' />
    <Lighting name='shadow500' />
    <Lighting name='shadow600' />
    <Lighting name='shadow700' />
    <typo.HeadingMedium> Media Queries </typo.HeadingMedium>
    Control media queries added to the theme for convenience.
    <Breakpoint name='small' media />
    <Breakpoint name='medium' media />
    <Breakpoint name='large' media />
    <typo.HeadingMedium> Name </typo.HeadingMedium>
    Control the name of your theme. For example, `light-theme`.
    <typo.HeadingMedium> Sizing </typo.HeadingMedium>
    Control spacing and sizing.
    <Sizing name='scale0' />
    <Sizing name='scale100' />
    <Sizing name='scale200' />
    <Sizing name='scale300' />
    <Sizing name='scale400' />
    <Sizing name='scale500' />
    <Sizing name='scale550' />
    <Sizing name='scale600' />
    <Sizing name='scale650' />
    <Sizing name='scale700' />
    <Sizing name='scale750' />
    <Sizing name='scale800' />
    <Sizing name='scale900' />
    <Sizing name='scale1000' />
    <Sizing name='scale1200' />
    <Sizing name='scale1400' />
    <Sizing name='scale1600' />
    <Sizing name='scale2400' />
    <Sizing name='scale3200' />
    <Sizing name='scale4800' />
    <typo.HeadingMedium> Typography </typo.HeadingMedium>
    Control typography family, size, weight, and height.
    <Type name='ParagraphXSmall' />
    <Type name='ParagraphSmall' />
    <Type name='ParagraphMedium' />
    <Type name='ParagraphLarge' />
    <Type name='LabelXSmall' />
    <Type name='LabelSmall' />
    <Type name='LabelSmall' />
    <Type name='LabelLarge' />
    <Type name='HeadingXSmall' />
    <Type name='HeadingSmall' />
    <Type name='HeadingMedium' />
    <Type name='HeadingLarge' />
    <Type name='HeadingXLarge' />
    <Type name='HeadingXXLarge' />
    <Type name='DisplayXSmall' />
    <Type name='DisplaySmall' />
    <Type name='DisplayMedium' />
    <Type name='DisplayLarge' />
  </Block>
);

export default App;
