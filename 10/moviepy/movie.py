from datetime import timedelta
from moviepy.video.io.VideoFileClip import VideoFileClip
import os

timestamps = []

# Read timestamps from time.txt and convert to seconds
with open('time.txt', 'r') as file:
    for line in file:
        line = line.strip()
        if line:
            time_parts = line.split(":")
            if len(time_parts) == 3:
                timestamp = timedelta(hours=int(time_parts[0]), minutes=int(time_parts[1]), seconds=int(time_parts[2]))
                timestamps.append(timestamp.total_seconds())

input_file = 'input.webm'  # Change this to your WebM file
output_folder = 'output'
os.makedirs(output_folder, exist_ok=True)

video_clip = VideoFileClip(input_file)

for i, timestamp in enumerate(timestamps):
    start_time = timestamp
    if i < len(timestamps) - 1:
        end_time = timestamps[i + 1]
    else:
        end_time = video_clip.duration

    cut_clip = video_clip.subclip(start_time, end_time)
    output_filename = os.path.join(output_folder, f'out_{i}.webm')  # Change the extension to .webm
    cut_clip.write_videofile(output_filename, codec='libvpx-vp9')  # Use libvpx-vp9 codec for WebM

video_clip.reader.close()
print("Video cutting and exporting complete.")
