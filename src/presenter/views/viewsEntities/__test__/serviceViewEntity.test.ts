import { Address } from "../../../../domain/entities/Address";
import { GroupUser } from "../../../../domain/entities/GroupUser";
import { AssistanceLevel, Profile } from "../../../../domain/entities/Profile";
import { HardLevel, Service, ServiceCategory, ServiceStep, ServiceType, SkillLevel } from "../../../../domain/entities/Service";
import { User, UserStatus } from "../../../../domain/entities/User";
import { ServiceView } from "../serviceViewEntity";
import { describe, it, expect } from 'vitest';


describe('ServiceView', () => {

    // Mock Utilisateur de base 
    const mockUser: User = {
        id: 1, email: 'user@test.com', status: UserStatus.ACTIVE, password: 'pwd', createdAt: new Date(), updatedAt: new Date(), lastConnection: new Date(),
        Profile: {
            userId: 1,
            firstName: 'Test',
            lastName: 'User',
            assistance: 'LEVEL_2' as any,
        } as Profile,
        GroupUser: [new GroupUser()],
    };

    // Mock Utilisateur Répondant 
    const mockResponder: User = {
        id: 2,
        email: 'resp@test.com',
        status: UserStatus.ACTIVE,
        password: 'pwd', createdAt: new Date(),
        updatedAt: new Date(),
        lastConnection: new Date(),
        Profile: {
            userId: 2,
            firstName: 'Responder',
            lastName: 'Test',
            assistance: 'LEVEL_4' as any,
        } as Profile,
        GroupUser: [new GroupUser()],
    };

    // --- Tests pour la logique GetPoints (via la propriété 'points') ---
    describe('Points Calculation ', () => {

        it('should calculate points range for ServiceType.GET without responder', () => {
            // Arrange: Service de type GET, hard=2, skill=3
            const mockService: Service = {
                type: ServiceType.GET,
                hard: 'LEVEL_2' as HardLevel,
                skill: 'LEVEL_3' as SkillLevel,
                User: mockUser, // Utilisateur créateur
                userId: mockUser.id,
                userIdResp: undefined,
                UserResp: undefined,
                description: 'Test Service Description',
                address: { address: '123 Test St', zipcode: '12345', city: 'Test City' } as Address,
                id: 1,
                title: 'Test GET',
                category: ServiceCategory.CATEGORY_1,
                status: ServiceStep.STEP_0,
                createdAt: new Date(),
                updatedAt: new Date(),
                image: '',
            };
            const baseExpected = Number((((2 / 2) + (3 / 2)) + 1).toFixed(1));
            const serviceView = new ServiceView(mockService, mockUser);
            expect(serviceView.points).toEqual([baseExpected, baseExpected + 2]); // attend [3.5, 5.5]
        });

        it('should calculate single point for ServiceType.DO without responder', () => {
            // Arrange: Service de type DO, hard=1, skill=1, user assistance=2
            const mockService: Service = {
                type: 'DO' as ServiceType,
                hard: 'LEVEL_1' as HardLevel,
                skill: 'LEVEL_1' as SkillLevel,
                User: mockUser,
                userId: mockUser.id,
                userIdResp: undefined,
                UserResp: undefined,
                description: 'Test Service Description',
                address: { address: '123 Test St', zipcode: '12345', city: 'Test City' } as Address,
                id: 1,
                title: 'Test GET',
                category: ServiceCategory.CATEGORY_1,
                status: ServiceStep.STEP_0,
                createdAt: new Date(),
                updatedAt: new Date(),
                image: '',
            };
            const baseExpected = Number(((1 / 2 + 1 / 2) + 1).toFixed(1)); // ((0.5 + 0.5) + 1) = 2.0
            const userPoints = 2;
            const serviceView = new ServiceView(mockService, mockUser);
            expect(serviceView.points).toEqual([baseExpected + (userPoints / 2)]);
        });

        it('should calculate single point based on responder if responder exists', () => {
            // Service (type GET) hard=4, skill=4, responder assistance=4
            const mockService: Service = {
                type: 'GET' as ServiceType,
                hard: 'LEVEL_4' as any,
                skill: 'LEVEL_4' as any,
                User: mockUser,
                userId: mockUser.id,
                userIdResp: mockResponder.id,
                UserResp: mockResponder,
                description: 'Test Service Description',
                address: { address: '123 Test St', zipcode: '12345', city: 'Test City' } as Address,
                id: 1,
                title: 'Test GET',
                category: ServiceCategory.CATEGORY_1,
                status: ServiceStep.STEP_0,
                createdAt: new Date(),
                updatedAt: new Date(),
                image: '',
            };
            const baseExpected = Number(((4 / 2 + 4 / 2) + 1).toFixed(1));
            const userRespPoints = parseInt(AssistanceLevel.LEVEL_4); // = 4

            // Act
            const serviceView = new ServiceView(mockService, mockUser);
            expect(serviceView.points).toEqual([baseExpected + (userRespPoints / 2)]);
        });

        it('should use default levels (LEVEL_0) if hard or skill are invalid/missing', () => {
            // Service de type GET, hard=undefined, skill=undefined, user assistance=2
            const mockService: Service = {
                type: ServiceType.GET as any,
                hard: undefined as any, // Niveau invalide/manquant
                skill: 'INVALID_LEVEL' as any, // Niveau invalide/manquant
                User: mockUser,
                userId: mockUser.id,
                userIdResp: undefined,
                UserResp: undefined,
                description: 'Test Service Description',
                address: { address: '123 Test St', zipcode: '12345', city: 'Test City' } as Address,
                category: ServiceCategory.CATEGORY_1,
                status: ServiceStep.STEP_0,
                createdAt: new Date(),
                updatedAt: new Date(),
                image: '',
                id: 4,
                title: 'Test Default',
            };
            // Hard=0, Skill=0
            const baseExpected = Number(((0 / 2 + 0 / 2) + 1).toFixed(1)); // = 1.0
            const serviceView = new ServiceView(mockService, mockUser);
            expect(serviceView.points).toEqual([baseExpected, baseExpected + 2]);
        });

    });


}); 