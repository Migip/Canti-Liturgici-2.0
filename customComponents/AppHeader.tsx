import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import clTheme from '../globals/classes/colorTheme';

export function AppHeader({ navigation, route, options, back }: NativeStackHeaderProps) {
    const insets = useSafeAreaInsets();
    const title = options.title ?? route.name;

    const left =
        options.headerLeft?.({ canGoBack: !!back, tintColor: clTheme.TextColorString }) ??
        (back ? (
            <Pressable onPress={navigation.goBack} hitSlop={12} style={{ padding: 8 }}>
                <FontAwesome6 name="chevron-left" size={20} color={clTheme.TextColor} />
            </Pressable>
        ) : null);

    const right = options.headerRight?.({ canGoBack: !!back, tintColor: clTheme.TextColorString });

    return (
        <View
            style={{
                paddingTop: insets.top,
                height: insets.top + 56,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 12,
                backgroundColor: clTheme.NavTheme.colors.card, // adatta al tuo tema
                // borderBottomWidth: 1,
                // borderBottomColor: clTheme.BorderColor,
            }}>
            <View style={{ flex: 1, alignItems: 'flex-start' }}>{left}</View>
            <Text
                numberOfLines={1}
                style={{ fontSize: 17, fontWeight: '600', color: clTheme.TextColor }}>
                {title}
            </Text>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>{right}</View>
        </View>
    );
}