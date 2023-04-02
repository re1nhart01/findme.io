import { StyleSheet } from 'react-native';
import { hDP, wDP } from '@utils/scaling';

export default StyleSheet.create({
  mt32: {
    marginTop: hDP(32),
  },
  mt40: {
    marginTop: hDP(40),
  },
  mt80: {
    marginTop: hDP(80),
  },
  mt20: {
    marginTop: hDP(20),
  },
  mb15pc: {
    marginBottom: '15.7%',
  },
  mt18pc: {
    marginTop: '18.2%',
  },
  pt20pc: {
    paddingTop: '20.7%',
  },
  mt15pc: {
    marginTop: '15.7%',
  },
  pt20: {
    paddingTop: hDP(20),
  },
  ph15: {
    paddingHorizontal: wDP(15),
  },
  mt50: {
    marginTop: hDP(50),
  },
  mb10: {
    marginBottom: hDP(10),
  },
  mh40: {
    marginHorizontal: wDP(40),
  },
  mb32: {
    marginBottom: hDP(32),
  },
  ph40: {
    paddingHorizontal: wDP(40),
  },
  g20: {
    gap: wDP(20),
  },
  mr32: {
    marginRight: wDP(32),
  },
  g32: {
    gap: wDP(32),
  },
});
