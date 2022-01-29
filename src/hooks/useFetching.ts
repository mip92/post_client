import {useState} from "react";

export const useFetching = (callback:any) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const fetching = async (...args: any[]) => {
        try {
            setIsLoading(true)
            await callback(...args)
        } catch (e:any) {
            if (e.response.data.message )setError(e.response.data.message);
            else setError(e.message);
            setTimeout(async () => {
                setError('')
            }, 2000)
        } finally {
            setIsLoading(false)
        }
    }

    return [fetching, isLoading, error] as const
}
