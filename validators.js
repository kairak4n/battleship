export function isCollusion(gameboard, coord, direction, length) {
    if (direction === 0) {
        for (let i = 0; i < length; i++) {
            if (gameboard.tiles[coord[0] + i][coord[1]]) {
                return true
            }
        }
    } else {
        for (let i = 0; i < length; i++) {
            if (gameboard.tiles[coord[0]][coord[1] + i]) {
                return true
            }
        }
    }
    return false
}
