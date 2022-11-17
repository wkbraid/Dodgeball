import slow from "./Entities.js"

//check for intersections


function Intersection(entity) {
    entity.props.deleteEntity(entity.id)
    entity.props.counter += 1
}
//entity1 = rectangle, entity2 = rectangle, callback = functionToCall
function rectangleCollision(entity1, entity2, callback) {
    if (entity1.y + entity1.height < entity2.y ||
        entity1.y > entity2.height + entity2.y) {
    }
    else if (entity1.x > entity2.x + entity2.width ||
        entity1.x + entity1.width < entity2.x) {

    }
    else {
        try {
            callback(entity1);
        } catch (error) {
            //console.log(error)
            Intersection(entity1)
        }

    }
}

//entity1 = circle, entity2 = rectange, callback = functionToCall
//invert = callback on entity2 instead of entity1?
function circleCollision(entity1, entity2, callback, invert) {
    let center = [entity1.x + (entity1.width / 2), entity1.y + (entity1.height) / 2]
    // //console.log(center[0])
    // //console.log(center[1])
    //left?
    if (center[0] < entity2.x) {
        //left, top?
        if (center[1] < entity2.y) {

            if (Math.sqrt(Math.pow((entity2.x - center[0]), 2)
                + Math.pow((center[1] - entity2.y), 2)) < entity1.borderRadius) {
                try {
                    if (invert == true) {
                        callback(entity2);
                    }
                    else {
                        callback(entity1)
                    }
                } catch (error) {
                    //console.log(error)
                    Intersection(entity1)
                };
                //console.log("top left!")

            }
            else { }
        }
        //left, bottom?
        else if (center[1] > entity2.y + entity2.height) {
            //collision with bottom left point?
            if (Math.sqrt(Math.pow((entity2.x - center[0]), 2)
                + Math.pow((center[1] - (entity2.y + entity2.height)), 2))
                < entity1.borderRadius) {
                try {
                    if (invert == true) {
                        callback(entity2);
                    }
                    else {
                        callback(entity1)
                    }
                } catch (error) {
                    //console.log(error)
                    Intersection(entity1)
                };
                //console.log("bottom left")

            }
            else { }
        }
        //left, middle
        else {
            if ((entity2.x - center[0]) < entity1.borderRadius) {
                try {
                    if (invert == true) {
                        callback(entity2);
                    }
                    else {
                        callback(entity1)
                    }
                } catch (error) {
                    //console.log(error)
                    Intersection(entity1)
                };
                //console.log("middle left")
            }
            else { }
        }
    }


    //right?
    else if (center[0] > (entity2.x
        + entity2.width)) {
        //right, top?
        if (center[1] < entity2.y) {
            if (Math.sqrt(Math.pow((center[0] - (entity2.x
                + entity2.width)), 2)
                + Math.pow((entity2.y - center[1]), 2))
                < entity1.borderRadius) {
                try {
                    if (invert == true) {
                        callback(entity2);
                    }
                    else {
                        callback(entity1)
                    }
                } catch (error) {
                    //console.log(error)
                    Intersection(entity1)
                };
                //console.log("top right")

            }
        }
        //right, bottom?
        else if (center[1] > (entity2.y
            + entity2.height)) {
            if (Math.sqrt(Math.pow((center[0] - (entity2.x
                + entity2.width)), 2)
                + Math.pow((center[1] - (entity2.y + entity2.height)), 2))
                < entity1.borderRadius) {
                try {
                    if (invert == true) {
                        callback(entity2);
                    }
                    else {
                        callback(entity1)
                    }
                } catch (error) {
                    //console.log(error)
                    Intersection(entity1)
                };
                //console.log("bottom right")

            }
        }

        //right middle
        else {
            if ((center[0] - (entity2.x + entity2.width)) < entity1.borderRadius) {
                try {
                    if (invert == true) {
                        callback(entity2);
                    }
                    else {
                        callback(entity1)
                    }
                } catch (error) {
                    //console.log(error)
                    Intersection(entity1)
                };
                //console.log("middle right")

            }
        }
    }

    // middle
    else {
        //above?
        if (center[1] < entity2.y) {
            if ((entity2.y - center[1]) < entity1.borderRadius) {
                try {
                    if (invert == true) {
                        callback(entity2);
                    }
                    else {
                        callback(entity1)
                    }
                } catch (error) {
                    //console.log(error)
                    Intersection(entity1)
                };
                //console.log("middle top")

            }
        }
        //below?
        else if (center[1] > (entity2.y
            + entity2.height)) {
            if ((center[1] - (entity2.y + entity2.height)) < entity1.borderRadius) {
                try {
                    if (invert == true) {
                        callback(entity2);
                    }
                    else {
                        callback(entity1)
                    }
                } catch (error) {
                    //console.log(error)
                    Intersection(entity1)
                };
                //console.log("middle bottom")

            }

        }
        //middle
        else {
            try {
                if (invert == true) {
                    callback(entity2);
                }
                else {
                    callback(entity1)
                }
            } catch (error) {
                //console.log(error)
                Intersection(entity1)
            };
            //console.log("middle middle")
        }
    }
}

export { rectangleCollision, circleCollision, Intersection }