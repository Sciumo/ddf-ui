/*global defineSuite*/
defineSuite([
         'Core/barycentricCoordinates',
         'Core/Cartesian3',
         'Core/Math'
     ], function(
         barycentricCoordinates,
         Cartesian3,
         CesiumMath) {
    "use strict";
    /*global jasmine,describe,xdescribe,it,xit,expect,beforeEach,afterEach,beforeAll,afterAll,spyOn,runs,waits,waitsFor*/

    var p0 = new Cartesian3(-1.0, 0.0, 0.0);
    var p1 = new Cartesian3( 1.0, 0.0, 0.0);
    var p2 = new Cartesian3( 0.0, 1.0, 1.0);

    it('evaluates to p0', function() {
        var point = Cartesian3.clone(p0);
        expect(barycentricCoordinates(point, p0, p1, p2)).toEqual(Cartesian3.UNIT_X);
    });

    it('evaluates to p1', function() {
        var point = Cartesian3.clone(p1);
        expect(barycentricCoordinates(point, p0, p1, p2)).toEqual(Cartesian3.UNIT_Y);
    });

    it('evaluates to p2', function() {
        var point = Cartesian3.clone(p2);
        expect(barycentricCoordinates(point, p0, p1, p2)).toEqual(Cartesian3.UNIT_Z);
    });

    it('evaluates on the p0-p1 edge', function() {
        var point = Cartesian3.multiplyByScalar(Cartesian3.add(p1, p0), 0.5);
        expect(barycentricCoordinates(point, p0, p1, p2)).toEqual(new Cartesian3(0.5, 0.5, 0.0));
    });

    it('evaluates on the p0-p2 edge', function() {
        var point = Cartesian3.multiplyByScalar(Cartesian3.add(p2, p0), 0.5);
        expect(barycentricCoordinates(point, p0, p1, p2)).toEqual(new Cartesian3(0.5, 0.0, 0.5));
    });

    it('evaluates on the p1-p2 edge', function() {
        var point = Cartesian3.multiplyByScalar(Cartesian3.add(p2, p1), 0.5);
        expect(barycentricCoordinates(point, p0, p1, p2)).toEqual(new Cartesian3(0.0, 0.5, 0.5));
    });

    it('evaluates on the interior', function() {
        var scalar = 1.0 / 3.0;
        var point = Cartesian3.multiplyByScalar(Cartesian3.add(Cartesian3.add(p0, p1), p2), scalar);
        expect(barycentricCoordinates(point, p0, p1, p2)).toEqualEpsilon(new Cartesian3(scalar, scalar, scalar), CesiumMath.EPSILON14);
    });

    it('throws without point', function() {
        expect(function() {
            barycentricCoordinates();
        }).toThrow();
    });

    it('throws without p0', function() {
        expect(function() {
            barycentricCoordinates(new Cartesian3());
        }).toThrow();
    });

    it('throws without p1', function() {
        expect(function() {
            barycentricCoordinates(new Cartesian3(), new Cartesian3());
        }).toThrow();
    });

    it('throws without p2', function() {
        expect(function() {
            barycentricCoordinates(new Cartesian3(), new Cartesian3(), new Cartesian3());
        }).toThrow();
    });
});