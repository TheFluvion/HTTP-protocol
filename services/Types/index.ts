export type EventInput = {
    target: {
        name: string
        value: string | number
    }
}

export type InputEvent = {
    currentTarget: {
        name: string;
        value: string | number | boolean | number[] | string[];
        checked?: boolean;
    };
};
