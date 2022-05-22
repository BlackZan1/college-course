export const attackBoxCollision = (rectangle1, rectangle2) => {
    return (
        rectangle1.attackBox.x + rectangle1.attackBox.width >=
            rectangle2.x &&
        rectangle1.attackBox.x <=
            rectangle2.x + rectangle2.width &&
        rectangle1.attackBox.y + rectangle1.attackBox.height >=
            rectangle2.y &&
        rectangle1.attackBox.y <= rectangle2.y + rectangle2.height
    )   
}