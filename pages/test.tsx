import { trpc } from "../utils/trpc"

export default function TestPage(){
  const test = trpc.useQuery(["test","steve"])
  if (!test.data){
    return <div>Loading ...</div>
  }
  return <div>{test.data.message}</div>
}