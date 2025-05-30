"use client";

import Link from 'next/link';

// The error object passed by Next.js often includes a digest (a hashed error signature for debugging)
interface Props {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: Props) {
    console.error("Page error:", error);

    return (
        <div>
            <h2>Something went wrong.</h2>
            <p>{error.message}</p>
            <button onClick={reset}>Try again</button>

            <div>
                <Link href="/">Go home</Link>
            </div>
        </div>
    );
}