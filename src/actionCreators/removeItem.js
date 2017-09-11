export function removeItem(itemIndex) {
    return (
        {type: 'REMOVE_ITEM', index: itemIndex}
    )

}