describe('get random number',function() {
    it('testsss',function() {
        let random = new ucai.Random(5,1,31);
        let result = random.getNNumber();
        expect(result.length).toBe(5)
        expect(result[0]).toBeLessThan(31)
        expect(result[0]).toBeGreaterThan(1)
        expect(result[1]).toBeLessThan(31)
        expect(result[1]).toBeGreaterThan(1)
        expect(result[2]).toBeLessThan(31)
        expect(result[2]).toBeGreaterThan(1)
        expect(result[3]).toBeLessThan(31)
        expect(result[3]).toBeGreaterThan(1)
        expect(result[4]).toBeLessThan(31)
        expect(result[4]).toBeGreaterThan(1)
    })
})
