import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

class FFmpegResource {
  private _baseUrl = "https://unpkg.com/@ffmpeg/core@0.12.2/dist/umd";
  private _ffmpeg!: FFmpeg;

  constructor() {
    this._config();
  }

  private async _config() {
    if (this._ffmpeg) {
      return this._ffmpeg;
    }

    this._ffmpeg = new FFmpeg();
    if (!this._ffmpeg.loaded) {
      await this._ffmpeg.load({
        coreURL: await toBlobURL(
          `${this._baseUrl}/ffmpeg-core.js`,
          "text/javascript"
        ),
        wasmURL: await toBlobURL(
          `${this._baseUrl}/ffmpeg-core.wasm`,
          "application/wasm"
        ),
      });
    }
  }

  async convertVideoToAudio(fileName: string) {
    await this._ffmpeg?.writeFile("input.mp4", await fetchFile(fileName));

    this._ffmpeg?.on("progress", (progress) => {
      console.log("Convert progress: " + Math.round(progress.progress * 100));
    });

    await this._ffmpeg?.exec([
      "-i",
      "input.mp4",
      "-map",
      "0:a",
      "-b:a",
      "20k",
      "-acodec",
      "libmp3lame",
      "output.mp3",
    ]);

    const data = await this._ffmpeg?.readFile("output.mp3");

    const audioFileBlob = new Blob([data], { type: "audio/mp3" });
    const audioFile = new File([audioFileBlob], "output.mp3", {
      type: "audio/mpeg",
    });

    console.log("Convert finished.");

    return audioFile;
  }
}
let ffmpegResource = new FFmpegResource();
export default ffmpegResource;
