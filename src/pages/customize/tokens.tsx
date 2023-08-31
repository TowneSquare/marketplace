import { useEffect, useState } from "react";
import { NftMetadataType } from "../../type/nft_type";
import { NFTS } from "../../state/constants";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { chooseTrait } from "../../state/tokens";

interface Props {
}
const Tokens: React.FC<Props> = ({ }) => {
   const currentNft = useAppSelector(state => state.tokensState.currentNft)
   const [tokens, setTokens] = useState<NftMetadataType[]>([]);
   const currentTrait = useAppSelector(state => state.tokensState.currentTrait)
   const dispatch = useAppDispatch();

   useEffect(() => {
      if (currentNft?.object_tokens) {
         let tokens: NftMetadataType[] = [];
         currentNft?.object_tokens.forEach(address => {
            let token = NFTS.filter((nft) => nft.address == address)
            if (token.length > 0)
               tokens.push(token[0])
         });
         setTokens(tokens);;
      }
   }, [currentNft?.object_tokens])

   const onChooseTrait = (token: NftMetadataType) => {
      dispatch(chooseTrait(token))
   }
   const onOrderUp = (index: number) => {
      if (index > 0) {
         let t = tokens[index - 1];
         tokens[index-1] = tokens[index];
         tokens[index] = t;
         setTokens([...tokens])
      }
   }
   const onOrderDown = (index: number) => {
      if (index < tokens.length - 1) {
         let t = tokens[index+1];
         tokens[index+1] = tokens[index];
         tokens[index] = t;
         setTokens([...tokens])
      }
   }
   return (
      <div className="p-4 w-[30vw] flex flex-col gap-4 border border-gray-dark-1 rounded-md">
         {tokens.map((token, index) => (
            <div className={`relative group p-2 flex items-center gap-4 bg-gray-dark-2 hover:bg-gray-light-3 rounded-md cursor-pointer ${currentTrait?.address == token.address ? "bg-gray-light-3" : ""}`}
               onClick={() => onChooseTrait(token)}
            >
               <img src="/customize/indicator.svg" alt="indicator" />
               <div className="w-20 h-20 bg-gray-dark-1 rounded-md">
                  <img src={token.uri} alt="uri" className="w-full h-full" />
               </div>
               <div className="">
                  <div className="flex gap-2">
                     <p className="text-[14px] text-gray-light-1 font-semibold">
                        {currentNft?.collection}
                     </p>
                     <img src="/nft-card/polygon-check.svg" alt="check" />
                  </div>
                  <p className="text-[14px] text-gray-light-1 font-semibold pt-4">
                     {token.collection}
                  </p>
                  <p className="text-[14px] font-semibold">
                     {token.name}
                  </p>
               </div>
               <div className="absolute w-10 hidden group-hover:flex flex-col  justify-center group/arrow right-4 bottom-4">
                  <p className="text-xl text-center hover:text-3xl" onClick={() => onOrderUp(index)}>↑</p>
                  <p className="text-xl text-center hover:text-3xl" onClick={() => onOrderDown(index)}>↓</p>
               </div>
            </div>
         ))}
      </div>
   )
}

export default Tokens;