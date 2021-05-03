import React from 'react';
import { Text } from 'react-native';

export default function Title({ children, tintColor }) {
    const entryId = children;
    const year = entryId.slice(0,4);
    const month = entryId.slice(5,7);
    const date = entryId.slice(8);

    return (
        <Text style={{color: tintColor}}>{`${date}/${month}/${year}`}</Text>
    )
}
