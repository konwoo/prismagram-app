import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import TakePhoto from "../screens/Photo/TakePhoto";
import SelectPhoto from "../screens/Photo/SelectPhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";

const PhotoTabs = createMaterialTopTabNavigator({
    TakePhoto,
    SelectPhoto
}, {
    tabBarPosition: "bottom"
});

export default createStackNavigator({
    PhotoTabs,
    UploadPhoto
})