
import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStepBackward, faStepForward, faExpand, faVolumeUp, faVolumeMute, faMusic } from '@fortawesome/free-solid-svg-icons';
import './PlayerPage.css';

const audioSrc = '/audio/戴亨莲/山魂 哟噢调.wav';

const albumCover = '/images/album-default.png'; // 可替换为实际封面

// 歌词数组，每一项包含时间戳（单位：秒）和歌词文本
// 请在 time 字段填写每句歌词出现的时间（单位：秒）
const lyrics = [
  { time: 0, text: '山魂 哟噢调 - 戴亨莲' },
  { time: 4, text: '西岭大山哟' },
  { time: 13, text: '有山魂哟 哟嗬嗬' },
  { time: 24, text: '山魂有声来又有哟' },
  { time: 32, text: '形啰嗬嗬' },
  { time: 38, text: '山歌唱的是噻山魂声哎' },
  { time: 49, text: '山歌唱的是来山民哟嗬嗬' },
  { time: 57, text: '心啰嗬嗬' },
  { time: 62, text: '山歌唱的是来山民哟嗬嗬' },
  { time: 70, text: '心啰嗬嗬' },
  // ... 你可以继续补充更多歌词，time 为该句歌词出现的时间（秒）
];


const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');
  return `${m}:${s}`;
};

const PlayerPage: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [needleActive, setNeedleActive] = useState(false);
  const [fullscreen, setFullscreen] = useState(true);
  const [dragging, setDragging] = useState(false);
  // 歌词高亮索引
  const currentLyricIndex = lyrics.findIndex((l, i) =>
    currentTime >= l.time && (i === lyrics.length - 1 || currentTime < lyrics[i + 1].time)
  );
  // 歌词滚动到高亮
  useEffect(() => {
    const el = document.querySelector('.lyrics-scroll .lyric-active');
    const parent = el?.parentElement;
    if (el && parent) {
      // 让高亮歌词滚动到歌词区正中间
        const parentRect = parent.getBoundingClientRect();
        const elRect = (el as HTMLElement).getBoundingClientRect();
        const elTop = elRect.top - parentRect.top;
        const elHeight = elRect.height;
        const parentHeight = parentRect.height;
        const scrollTop = parent.scrollTop + elTop - parentHeight / 2 + elHeight / 2;
        parent.scrollTo({
        top: scrollTop,
        behavior: 'smooth',
        });
    }
  }, [currentLyricIndex]);



  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = muted;
    }
  }, [volume, muted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setNeedleActive(false);
    } else {
      audioRef.current.play();
      setNeedleActive(true);
    }
    setPlaying(!playing);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value);
      setCurrentTime(Number(e.target.value));
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = Number(e.target.value);
    setVolume(vol);
    setMuted(vol === 0);
  };

  const toggleMute = () => {
    setMuted((m) => !m);
  };

  const toggleFullscreen = () => {
    setFullscreen(f => !f);
  };





  return (
    <div className={`player-root${fullscreen ? ' fullscreen' : ''}`}>
      {/* 顶部导航 */}
      <nav className="player-nav">
        <span className="player-title"><FontAwesomeIcon icon={faMusic} /> 播放器</span>
        <button className="nav-btn" onClick={toggleFullscreen} title="全屏歌词"><FontAwesomeIcon icon={faExpand} /></button>
      </nav>
      {/* 唱片区 */}
      <div className="player-disc-area">
        <div className="disc-outer">
          <div className={`needle${needleActive ? ' needle-on' : ''}`}></div>
          <div className={`disc${playing ? ' spinning' : ''}`}> 
            <img src={albumCover} alt="专辑封面" className="album-cover" />
            <div className="disc-center"></div>
          </div>
        </div>
      </div>
      {/* 歌曲信息 */}
      <div className="player-info">
        <h2>山魂 哟噢调</h2>
        <p>戴亨莲</p>
      </div>
      {/* 歌词区（带滚动和高亮，时间戳请在 lyrics 变量中填写） */}
      <div className="lyrics-scroll">
        {lyrics.map((l, i) => (
          <div key={i} className={`lyric-line${i === currentLyricIndex ? ' lyric-active' : ''}`}>{l.text}</div>
        ))}
      </div>
      {/* 进度条 */}
      <div className="player-progress">
        <span>{formatTime(currentTime)}</span>
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          onMouseDown={() => setDragging(true)}
          onMouseUp={() => setDragging(false)}
          className="progress-bar"
        />
        <span>{formatTime(duration)}</span>
      </div>
      {/* 底部控制区 */}
      <div className="player-controls">
        <button className="ctrl-btn" title="上一曲"><FontAwesomeIcon icon={faStepBackward} /></button>
        <button className="ctrl-btn play-btn" onClick={togglePlay} title={playing ? '暂停' : '播放'}>
          <FontAwesomeIcon icon={playing ? faPause : faPlay} />
        </button>
        <button className="ctrl-btn" title="下一曲"><FontAwesomeIcon icon={faStepForward} /></button>
        <button className="ctrl-btn" onClick={toggleMute} title={muted ? '取消静音' : '静音'}>
          <FontAwesomeIcon icon={muted || volume === 0 ? faVolumeMute : faVolumeUp} />
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={muted ? 0 : volume}
          onChange={handleVolumeChange}
          className="volume-bar"
        />
      </div>
      {/* 隐藏的 audio 元素 */}
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setPlaying(false)}
      />
    </div>
  );
};

export default PlayerPage;
