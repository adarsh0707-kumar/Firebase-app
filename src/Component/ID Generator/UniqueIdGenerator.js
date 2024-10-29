class UniqueIdGenerator {
    static generateStudentId() {
        return `STU-${Date.now()}`;
    }

    static generateFacultyId() {
        return `FAC-${Date.now()}`;
    }
}

export default UniqueIdGenerator;