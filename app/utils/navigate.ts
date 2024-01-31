import { CommonActions } from '@react-navigation/native';
import { navigationRef } from '../../App';

const navigate = (name: string, params?: object) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.navigate({ name, params }));
  }
};

export default navigate;
