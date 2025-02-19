import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import React, { useState, useMemo, useRef } from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import LuggageItemRow from './LuggageItemRow';
import { CustomItemType, OfferFormType } from './OfferNewPage';
import StyledTextInput from './StyledTextInput';
import debounce from 'lodash/debounce';

type Props = {
    form: UseFormReturn<OfferFormType, any, undefined>;
};

const CommonItemsForm = ({ form }: Props) => {
    const { fields, remove } = useFieldArray({
        control: form.control,
        name: 'commonItems',
    });

    const existingItemNames = useMemo(() => fields.map((v) => v.name) || [], [fields]);

    const [items, setItems] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');

    // Fetch data only once
    React.useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/api/inventoryOptions`);
                const data = await response.json();

                const flattenedItems = data.flatMap((group: any) => group.items).filter(item =>
                    item.name !== 'Standard box' &&
                    item.name !== 'Large box' &&
                    item.name !== 'Suitcase large' &&
                    item.name !== 'Suitcase small'
                );

                setItems(flattenedItems);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    // Debounce function using useRef to persist across renders
    const searchRef = useRef(
        debounce((query) => {
            setSearchQuery(query);
        }, 200)
    );

    // Handle search input (without debounce lag)
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        searchRef.current(event.target.value.toLowerCase());
    };

    // Optimized filtering
    const filteredItems = useMemo(() => {
        if (!searchQuery) return items.filter(item => !existingItemNames.includes(item.name));

        const queryWords = searchQuery.split(' ').filter(Boolean);
        console.log(existingItemNames, "existingItemNames");

        return items
            .filter((item) => !existingItemNames.includes(item.name)) // Remove existing items
            .filter((item) => queryWords.every((word) => item.name?.toLowerCase().includes(word)));
    }, [searchQuery, items, existingItemNames]); // Add existingItemNames as a dependency


    const handleAddItem = (item: CustomItemType) => {
        form.setValue('commonItems', [...fields, item]);
    };

    const handleRemoveItem = (item: CustomItemType) => {
        const index = fields.findIndex((field) => field.name === item.name);
        if (index !== -1) remove(index);
    };

    return (
        <Stack direction="row" gap={2} pb={2} pt={0}>
            <Box flex={1} display="flex" flexDirection="column" gap={1}>
                {fields.map((field) => {
                    const quantity = fields.filter((item) => item.name === field.name).length;
                    return (
                        <Box key={field.id}>
                            <LuggageItemRow
                                quantity={quantity}
                                onIncrease={() => handleAddItem(field)}
                                onDecrease={() => handleRemoveItem(field)}
                                primaryText={field.name}
                                dimensions={`${field.height} x ${field.width} x ${field.length} cm`}
                                maxWeight={field.weight}
                                form={form}
                                name={field.name}
                            />
                        </Box>
                    );
                })}

                {/* Search Input */}
                <Box mt={6}>
                    <StyledTextInput
                        label="Search for common items"
                        fullWidth
                        onChange={handleSearch} // Uses debounce inside ref
                    />
                </Box>

                {/* Filtered Items List */}
                {searchQuery && filteredItems.length > 0 && (
                    <Stack spacing={2} sx={{ maxHeight: 360, overflowY: 'auto', pr: '14px' }}>
                        {filteredItems.map((item) => (
                            <LuggageItemRow
                                key={item.id}
                                item={item}
                                onIncrease={() => handleAddItem(item)}
                                onDecrease={() => handleRemoveItem(item)}
                                primaryText={item.name}
                                dimensions={`${item.height} x ${item.width} x ${item.length} cm`}
                                maxWeight={item.weight}
                                form={form}
                                name={item.slug}
                            />
                        ))}
                    </Stack>
                )}
            </Box>
        </Stack>
    );
};

export default CommonItemsForm;
