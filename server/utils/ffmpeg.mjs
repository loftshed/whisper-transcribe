import Ffmpeg from 'fluent-ffmpeg';

const TARGET_FILE_SIZE = 2097150;

const compress = async (file) => {
  try {
    const inputFilePath = `/${file.path}`;
    const outputFilePath = `${inputFilePath.slice(0, -4)}-compressed${inputFilePath.slice(-4)}`;
    console.log(inputFilePath);

    const ffmpeg = Ffmpeg(inputFilePath);
    ffmpeg.ffprobe(file.path, function (err, metadata) {
      console.dir(metadata);
    });

    // const command = new FfmpegCommand(file.path);

    // const audio = await ffmpeg.ffprobe();
    // const duration = audio.format.duration;
    // // Set the bitrate to the target file size divided by the duration
    // const bitRate = Math.floor((TARGET_FILE_SIZE * 8) / duration);

    // console.log(audio);

    // ffmpeg(inputFilePath)
    //   .output(outputFilePath)
    //   .audioBitrate(bitRate)
    //   .on('end', () => {
    //     console.log('Conversion complete');
    //   });
  } catch (error) {
    console.log(error);
  }
};

export { compress };
