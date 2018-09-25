enum BoardSize { SMALL = 1, LARGE };
enum TileType { DESERT = 1, SEA, FIELD, FOREST, PASTURE, MOUNTAIN, HILL };
enum ResourceType { GRAIN = 1, LUMBER, WOOL, ORE, BRICK, ANY };
enum SettlementType { TOWN = 1, CITY };

enum EdgeLoc { TOP_L = 1, TOP_R, MID_L, MID_R, BOT_L, BOT_R };
enum VertexLoc { TOP_L = 1, TOP_M, TOP_R, BOT_L, BOT_M, BOT_R };

export { BoardSize, TileType, ResourceType, SettlementType };
export { EdgeLoc, VertexLoc };