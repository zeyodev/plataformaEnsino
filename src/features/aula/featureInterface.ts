export default interface Aula {
    _id: string
    title: string
    description: string
    status: string
    length: number
    video_player: string
    video_hls: string
    thumbnail: string
    preview: string
    available_resolutions: string[]
    playback: string[]
    width: number
    height: number
    playable: boolean
}
