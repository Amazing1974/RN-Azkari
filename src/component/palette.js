import { Dimensions, Platform } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import COLORS from './colors';

const { width } = Dimensions.get('window');

const PALETTE = {
  //
  // General style
  //
  heading: {
    color: COLORS.white,
    fontSize: 20,
    textAlign: 'center',
  },
  body: {
    flex: 1,
    ...ifIphoneX(
      {
        paddingTop: 50,
      },
      Platform.OS === 'ios' && {
        paddingTop: 20,
      },
    ),
  },
  f1: {
    flex: 1,
  },
  mainPadding: {
    paddingHorizontal: 10,
  },
  text: {
    fontFamily: 'Rubik-Regular',
    color: COLORS.greySlate,
  },
  lightRubik: {
    fontFamily: 'Rubik-Light',
  },
  regularRubik: {
    fontFamily: 'Rubik-Regular',
  },
  mediumRubik: {
    fontFamily: 'Rubik-Medium',
  },
  boldRubik: {
    fontFamily: 'Rubik-Bold',
  },
  textCenter: {
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  //
  // Primary direction
  //
  primaryCenter: {
    justifyContent: 'center',
  },
  primaryBetween: {
    justifyContent: 'space-between',
  },
  primaryEnd: {
    justifyContent: 'flex-end',
  },
  //
  // Secondary direction
  //
  secondaryCenter: {
    alignItems: 'center',
  },
  secondaryEnd: {
    alignItems: 'flex-end',
  },
  //
  // Wrapper padding: ex the padding of the card view wrapper
  //
  wrapperHorizontalPadding: {
    paddingRight: 21,
    paddingLeft: 24,
  },
  //
  // Time text style of the card view
  //
  timeText: {
    opacity: 0.3,
    letterSpacing: 0.3,
    fontSize: 12,
  },
  //
  // Header container, left arrow and title styles of each screen
  //
  header: {
    width: '100%',
    height: 52.8,
    paddingLeft: 26,
    paddingRight: 24,
    backgroundColor: COLORS.white,
  },
  headerTitleWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  headerTitle: {
    fontSize: 18,
    letterSpacing: 0.4,
  },
  leftArrow: {
    width: 24,
    height: 25,
    resizeMode: 'contain',
  },
  search: {
    width: 24,
    height: 25,
    resizeMode: 'contain',
  },
  //
  // Container for common modals
  //
  swipeModalContainer: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 32,
    paddingBottom: 52,
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
  },
  popupModalContainer: {
    width: '90%',
    height: 276,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    alignSelf: 'center',
  },
  modalStyle: {
    margin: 0,
  },
  knob: {
    width: 68,
    height: 3,
    backgroundColor: COLORS.greySlate,
    marginTop: 14,
    marginBottom: 31,
    alignSelf: 'center',
  },
  //
  // Group item styles
  //
  groupItemTitle: {
    fontSize: 16,
    letterSpacing: 0.3,
  },
  groupItemWrapper: {
    width: '100%',
    height: 90,
    paddingHorizontal: 32,
    paddingTop: 18,
    backgroundColor: COLORS.greyPale,
  },
  groupItemShadow: {
    backgroundColor: COLORS.white,
    elevation: 4,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
  },
  groupItemDownIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  groupActiveItemIntent: {
    marginLeft: 7,
  },
  //
  // TabView and Tabbar style
  //
  inActiveTabText: {
    fontSize: 18,
    fontFamily: 'Helvetica',
    letterSpacing: 0.4,
    opacity: 0.6,
    color: COLORS.greySlate,
  },
  activeTabText: {
    width: 130,
    height: 40,
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'Rubik-Medium',
    letterSpacing: 0.4,
    color: COLORS.redRouge,
  },
  tabBar: {
    backgroundColor: COLORS.white,
    padding: 0,
    margin: 0,
  },
  //
  // Button wrapper for Color and Gradient
  //
  buttonWrapper: {
    paddingHorizontal: 13.6,
    height: 50,
    borderRadius: 25,
    alignSelf: 'center',
  },
  buttonText: {
    fontFamily: 'Helvetica',
    fontSize: 16,
    letterSpacing: 0.3,
  },
  //
  // Swipe buttons for student item
  //
  rowBack: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 44,
  },

  //
  // Style for request
  //
  requetCardWrapper: {
    height: 334,
    marginTop: 14,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.greySlate,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 10,
    paddingTop: 14,
    marginHorizontal: 6, // + the paddingHorizontal of the parent  = 16
    marginBottom: 6,
  },
  // Icon
  requestThumbIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 22,
    height: 23,
    resizeMode: 'contain',
  },
  requestAvatarIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  requestBookIcon: {
    width: 16,
    height: 20,
    resizeMode: 'contain',
  },
  requestCalendarIcon: {
    width: 18,
    height: 20,
    resizeMode: 'contain',
  },
  requestClockIcon: {
    width: 18.3,
    height: 18.3,
    resizeMode: 'contain',
  },
  requestTimerIcon: {
    width: 18,
    height: 20,
    resizeMode: 'contain',
  },
  requestMapIcon: {
    width: 18,
    height: 20,
    resizeMode: 'contain',
  },
  // Row wrapper
  requestRowWrapper: {
    marginTop: 10,
  },
  requestIconWrapper: {
    width: 32,
  },
  // Text
  requestFileText: {
    width: 16,
    height: 20,
    resizeMode: 'contain',
  },
  requestNameText: {
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 9,
  },
  requestNormalText: {
    fontSize: 15,
    marginLeft: 9,
  },
  requestClassText: {
    marginLeft: 41,
    fontSize: 15,
  },
  requestAlertText: {
    fontSize: 12,
  },
  // Lesson Wrapper && Text
  requestLessonWrapper: {
    width: 50,
    height: 24,
    backgroundColor: COLORS.greyBlueCloudy,
    // opacity: 0.2,
    borderRadius: 4,
    marginLeft: 9,
  },
  requestLessonText: {
    fontSize: 12,
    letterSpacing: 0.3,
    color: COLORS.greyBattleShip,
  },
  // Button Wrapper && Text
  requestButtonWrapper: {
    width: '100%',
    height: 57,
  },
  requestButtonText: {
    fontSize: 14,
  },
  // Gradient Style
  requestGradientStyle: {
    paddingHorizontal: 4,
    paddingVertical: 3,
    borderRadius: 4,
  },
  requestGradientText: {
    fontSize: 12,
    fontFamily: 'Helvetica',
    color: COLORS.greySlate,
  },
};

export default PALETTE;
