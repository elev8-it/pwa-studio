import { useCallback, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';

import DEFAULT_OPERATIONS from './wishlistButton.gql';

export const useWishlistButton = props => {
    const { itemOptions } = props;
    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);

    const { addProductToWishlistMutation } = operations;

    const [itemAdded, setItemAdded] = useState(false);

    useEffect(() => {
        if (itemOptions.selected_options) setItemAdded(false);
    }, [itemOptions.selected_options]);

    const [
        addProductToWishlist,
        { loading: isAddLoading, error: addProductError }
    ] = useMutation(addProductToWishlistMutation);

    const handleClick = useCallback(async () => {
        try {
            await addProductToWishlist({
                variables: {
                    // TODO: "0" will create a wishlist if doesn't exist, and add to one if it does, regardless of the user's single wishlist id. In 2.4.3 this will be "fixed" by removing the `wishlistId` param entirely because all users will have a wishlist created automatically in CE. So should only have to pass items and it will add correctly.
                    wishlistId: '0',
                    itemOptions
                }
            });
            setItemAdded(true);
        } catch (err) {
            if (process.env.NODE_ENV === 'production') {
                console.log(err);
            }
        }
    }, [addProductToWishlist, itemOptions]);

    return {
        addProductError,
        handleClick,
        isDisabled: itemAdded || isAddLoading,
        itemAdded
    };
};
