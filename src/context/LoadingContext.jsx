import React, { createContext, useState, useEffect } from "react";
import { View, Animated, Easing } from "react-native";

export const LoadingContext = createContext(false);

export function Loading({ children }) {
    const [loading, setLoading] = useState(false);
    const spinValue = new Animated.Value(0);

    useEffect(() => {
        const spin = spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        });

        const animation = Animated.loop(
            Animated.timing(
                spinValue,
                {
                    toValue: 1,
                    duration: 2000,
                    easing: Easing.linear,
                    useNativeDriver: true
                }
            )
        );

        animation.start();
    }, []);

    const updateLoading = (status) => {
        setLoading(status);
    }

    return (
        <LoadingContext.Provider value={updateLoading}>
            {children}
            {loading && (
                <View style={{
                    backgroundColor: "#102C57",
                    position: "absolute",
                    opacity: .9,
                    width: "100%",
                    height: "100%",
                    zIndex: 3,

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Animated.View
                        style={{
                            transform: [{
                                rotate: spinValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0deg', '360deg']
                                })
                            }],

                            borderColor: "white",
                            borderRightWidth: 10,
                            borderLeftWidth: 10,
                            borderRadius: 50,
                            width: 80,
                            height: 80,
                        }}
                    />
                </View>
            )}
        </LoadingContext.Provider>
    );
}
