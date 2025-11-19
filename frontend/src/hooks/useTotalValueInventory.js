import { useCallback, useState, useEffect } from "react";
import { totalValueInventory } from "../../api/report.api";

export default function useInventoryTotalValue() {
    const [value, setValue] = useState(0);
    const [items, setItems] = useState(0);
    const [error, setError] = useState(null);

    const load = useCallback(async () => {
        try {
            const inventory = await totalValueInventory();
            setValue(inventory.report.totalValue);
        } catch (err) {
            setError(err)
        }
    });

    useEffect(() => {
        load();
    }, [load]);

    return {
        value,
        items,
        error,
        reload: load
    }
}