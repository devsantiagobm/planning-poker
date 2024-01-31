"use client";
import {  AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { axios } from "@/utils";
import { useState } from "react";

export function useCreateClassroom() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function createClassroom(classRoomName: string) {
        try {

            setError(null)
            setLoading(true)

            const response: AxiosResponse<{ classRoomId: string }> = await axios({
                url: "/classroom",
                method: "POST",
                data: { "name": classRoomName }
            })

            setLoading(false)
            const { classRoomId } = response.data;
            router.push(`/classroom/${classRoomId}`)

        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
                setLoading(false)
            }
        }
    }

    return { createClassroom, loading, error }
}