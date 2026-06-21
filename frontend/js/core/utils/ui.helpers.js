function createOptionsFromArray(array) {
    return array.map(item => ({
        value: item,
        text: item
    }));
}

function createTomSelect(id, options, placeholder) {
    const el = document.getElementById(id);

    if (!el) return;
    new TomSelect(el, {
        options,
        valueField: "value",
        labelField: "text",
        searchField: ["text"],
        create: false,
        maxItems: 1,
        placeholder,
        allowEmptyOption: true,
        maxOptions: null,
        sortField: { field: "text", direction: "asc" }
    });
}

export const uiHelpers = {
    createOptionsFromArray,
    createTomSelect
}