function Frame5() {
  return (
    <div className="absolute bg-[#15857a] content-stretch flex gap-[10px] h-[71px] items-center justify-center left-[calc(50%-0.5px)] rounded-[15px] top-[322px] translate-x-[-50%] w-[439px]">
      <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[32px] text-center text-nowrap text-white">
        <p className="leading-[normal] whitespace-pre">Buy 30 books for our kids!</p>
      </div>
    </div>
  );
}

export default function Frame4() {
  return (
    <div className="bg-black relative rounded-[50px] size-full">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute flex flex-col font-['Inter:Medium',_sans-serif] font-medium h-[73px] justify-center leading-[0] left-[258px] not-italic text-[40px] text-center text-white top-[91.5px] translate-x-[-50%] translate-y-[-50%] w-[406px]">
          <p className="leading-[normal]">✨️ Champion ✨</p>
        </div>
        <div className="absolute flex flex-col font-['Inter:Medium',_sans-serif] font-medium h-[183px] justify-center leading-[0] left-[257.5px] not-italic text-[0px] text-center text-white top-[219.5px] translate-x-[-50%] translate-y-[-50%] w-[427px]">
          <p className="leading-[normal]">
            <span className="text-[76px]">$30</span>
            <span className="text-[40px]"> </span>
            <span className="text-[40px] text-[rgba(255,255,255,0.5)]">/ mo.</span>
          </p>
        </div>
        <Frame5 />
      </div>
      <div aria-hidden="true" className="absolute border-[5px] border-solid border-white inset-0 pointer-events-none rounded-[50px]" />
    </div>
  );
}