import useGame from './store/useGame';

const Interface = () => {
  const setColor = useGame((state) => state.setColor);

  return (
    <div className='fixed bottom-10 left-10 w-[250px] h-[150px] '>
      <span className='text-xl font-semibold capitalize text-neutral-300'>
        Color picker
      </span>

      <div className='absolute top-0 left-0 flex gap-5 items-center w-full h-full'>
        <div
          onClick={() => setColor('yellow')}
          className='bg-yellow-500 hover:scale-105 size-10 rounded-full cursor-pointer'
        ></div>
        <div
          onClick={() => setColor('hotpink')}
          className='bg-pink-500 hover:scale-105 size-10 rounded-full cursor-pointer'
        ></div>
        <div
          onClick={() => setColor('red')}
          className='bg-red-500 hover:scale-105 size-10 rounded-full cursor-pointer'
        ></div>
      </div>
    </div>
  );
};

export default Interface;
