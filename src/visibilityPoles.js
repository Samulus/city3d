//
// visibilityPoles.js
// Author: Samuel Vargas
// Date: 10/05/2019
//

const THREE = require('three');

export class VisibilityPoles {
    constructor() {
        this.raycaster = new THREE.Raycaster();
        this.poleA = null;
        this.buildingA = null;
        this.poleB = null;
        this.buildingB = null;
        this.visibilityLine = null;
    }

    update(mouse, threeState) {
        this.raycaster.setFromCamera(mouse, threeState.camera);
        let intersects = this.raycaster.intersectObjects(threeState.scene.children);

        // Ignore if the user clicked but no object was selected.
        if (intersects.length === 0) {
            return;
        }

        // Ignore if the user clicks the line itself
        if (intersects[0].object.type === "Line") {
            return;
        }

        // Ignore if the user double clicks the same building
        if (this.buildingA !== null && intersects[0].object === this.buildingA.object) {
            return;
        }

        if (this.poleA === null) {
            this.poleA = VisibilityPoles.generateVerticalLineThroughBuilding(intersects[0], 0xFD8405);
            this.buildingA = intersects[0];
            threeState.scene.add(this.poleA);
        } else if (this.poleB === null) {
            this.poleB = VisibilityPoles.generateVerticalLineThroughBuilding(intersects[0], 0x05EFFD);
            this.buildingB = intersects[0];
            threeState.scene.add(this.poleB);
        }  else {
            // Nothing else to do, two buildings already selected.
            return;
        }

        if (this.poleA !== null && this.poleB !== null) {
            // Calculate points above the selected buildings (1.5m above the building)
            const pointAboveBuildingA = this.buildingA.object.position.clone();
            pointAboveBuildingA.y += 1.5 + (this.buildingA.object.scale.y * 0.5);
            const pointAboveBuildingB = this.buildingB.object.position.clone();
            pointAboveBuildingB.y += 1.5 + (this.buildingB.object.scale.y * 0.5);

            // Setup the raycaster for building intersection tests
            const lineCheck = new THREE.Raycaster();
            const direction = pointAboveBuildingB.clone().sub(pointAboveBuildingA.clone());

            // Adjust near / far planes so that the raycaster doesn't intersect
            // buildings BEHIND the currently selected buildings.
            lineCheck.near = 0;
            lineCheck.far = direction.length();
            lineCheck.set(pointAboveBuildingA, direction.clone().normalize());
            lineCheck.linePrecision = 0.01;

            let intersectedBuildings = lineCheck.intersectObjects(threeState.scene.children);
            // The three.js raycasting function reports `poleA` and `poleB` in the intersection test,
            // so more than two items in the intersection array indicates an extra building that
            // was intersected.
            let color = intersectedBuildings.length > 2 ? 0xff0000 : 0x00ff00;
            this.visibilityLine = VisibilityPoles.generateLineBetweenPoints(pointAboveBuildingA, pointAboveBuildingB, color);
            threeState.scene.add(this.visibilityLine);
        }
    }

    reset(threeState) {
        if (this.poleA !== null) {
            this.poleA.material.dispose();
            threeState.scene.remove(this.poleA);
            this.poleA = null;
        }

        if (this.poleB !== null) {
            this.poleB.material.dispose();
            threeState.scene.remove(this.poleB);
            this.poleB = null;
        }

        if (this.visibilityLine !== null) {
            this.visibilityLine.material.dispose();
            threeState.scene.remove(this.visibilityLine);
            this.visibilityLine = null;
        }
    }

    static generateVerticalLineThroughBuilding(selectedBuilding, color) {
        let material = new THREE.LineBasicMaterial({color: color});
        let geometry = new THREE.Geometry();
        let veryTallPoint = selectedBuilding.object.position.clone();
        veryTallPoint.y += 1000;
        geometry.vertices.push(selectedBuilding.object.position);
        geometry.vertices.push(veryTallPoint);
        return new THREE.Line(geometry, material);
    }

    static generateLineBetweenPoints(pointA, pointB, color) {
        let material = new THREE.LineBasicMaterial({color: color});
        let geometry = new THREE.Geometry();
        geometry.vertices.push(pointA);
        geometry.vertices.push(pointB);
        return new THREE.Line(geometry, material);
    }
}