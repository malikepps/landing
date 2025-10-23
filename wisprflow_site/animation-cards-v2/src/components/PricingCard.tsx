interface PricingCardProps {
  title: string;
  price: number;
  period: string;
  benefit: string;
  buttonColor: string;
}

function BenefitButton({ benefit, color }: { benefit: string; color: string }) {
  return (
    <div 
      className="absolute content-stretch flex gap-[10px] h-[140px] items-center justify-center left-[calc(50%-0.5px)] rounded-[20px] top-[420px] translate-x-[-50%] w-[500px]"
      style={{ backgroundColor: color }}
    >
      <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[110px] text-center text-nowrap text-white">
        <p className="leading-[normal] whitespace-pre">{benefit}</p>
      </div>
    </div>
  );
}

export default function PricingCard({ title, price, period, benefit, buttonColor }: PricingCardProps) {
  return (
    <div className="bg-black relative rounded-[50px] w-full h-full shrink-0">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute flex flex-col font-['Inter:Medium',_sans-serif] font-medium h-[140px] justify-center leading-[0] left-[258px] not-italic text-[150px] text-center text-white top-[114.5px] translate-x-[-50%] translate-y-[-50%] w-[516px]">
          <p className="leading-[normal]">{title}</p>
        </div>
        <div className="absolute flex flex-col font-['Inter:Medium',_sans-serif] font-medium h-[250px] justify-center leading-[0] left-[257.5px] not-italic text-[0px] text-center text-white top-[274.5px] translate-x-[-50%] translate-y-[-50%] w-[516px]">
          <p className="leading-[normal]">
            <span className="text-[240px]">${price}</span>
            <span className="text-[120px]"> </span>
            <span className="text-[120px] text-[rgba(255,255,255,0.5)]">/ {period}</span>
          </p>
        </div>
        <BenefitButton benefit={benefit} color={buttonColor} />
      </div>
      <div aria-hidden="true" className="absolute border-[5px] border-solid border-white inset-0 pointer-events-none rounded-[50px]" />
    </div>
  );
}
