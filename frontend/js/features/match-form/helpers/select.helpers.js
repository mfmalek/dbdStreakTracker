function setSelectValue(element, value) {
    if (element?.tomselect) {
        element.tomselect.setValue(value);
    } else {
        element.value = value;
    }
}

export const selectHelpers = {
    setSelectValue
};