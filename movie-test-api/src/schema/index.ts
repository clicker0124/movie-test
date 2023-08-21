import userTypeDef from "./auth";
import movieTypeDef from "./movieSchema";
import reviewTypeDef from "./reviewSchema";

import { mergeTypeDefs } from "@graphql-tools/merge";

const typeDefs = mergeTypeDefs([movieTypeDef, reviewTypeDef, userTypeDef]);
export default typeDefs;
