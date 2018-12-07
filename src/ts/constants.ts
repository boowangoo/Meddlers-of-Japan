enum BoardSize { SMALL = 1, LARGE };
enum TileType { DESERT = 1, SEA, FIELD, FOREST, PASTURE, MOUNTAIN, HILL };
enum ResourceType { GRAIN = 1, LUMBER, WOOL, ORE, BRICK, ANY };
enum SettlementType { TOWN = 1, CITY };
enum HoverBoxType { TILE = 1, SETTLEMENT, ROAD }

enum EdgeLoc { TOP_L = 1, TOP_R, MID_L, MID_R, BOT_L, BOT_R };
enum VertexLoc { TOP_L = 1, TOP_M, TOP_R, BOT_L, BOT_M, BOT_R };


const smallTokens: Array<number> = [5, 2, 6, 3, 8, 10, 9, 12, 11, 4, 8, 10, 9, 4, 5, 6, 3, 11];
const largeTokens: Array<number> = [2, 5, 4, 6, 3, 9, 8, 11, 11, 10, 6, 3, 8, 4, 8, 10, 11, 12, 10, 5, 4, 9, 5, 9, 12, 3, 2, 6];

export { BoardSize, TileType, ResourceType, SettlementType, HoverBoxType };
export { EdgeLoc, VertexLoc };
export { smallTokens, largeTokens };