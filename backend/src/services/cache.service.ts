import { IGetUser } from "@/interfaces/user.interface";
import { RedisService } from "./redis.service";
import { IGetTeam } from "@/interfaces/team.interface";
import { IGetProject } from "@/interfaces/project.interface";

type CacheKey = "users" | "teams" | "projects";

class CacheService {
  private readonly cacheKeys: Record<string, CacheKey> = {
    user: "users",
    team: "teams",
    project: "projects",
  };

  private async getAll<T>(key: CacheKey): Promise<T[] | null> {
    const data = await RedisService.get<T[]>(key);
    return data;
  }

  private async getOne<T extends { id: string }>(
    key: CacheKey,
    id: string
  ): Promise<T | null> {
    const items = await this.getAll<T>(key);
    if (items) {
      const item = items.find((item) => item.id === id);
      return item || null;
    }
    return null;
  }

  private async setAll<T>(key: CacheKey, items: T[]): Promise<void> {
    await RedisService.set<T[]>(key, items);
  }

  private async deleteAll<T>(key: CacheKey): Promise<void> {
    await RedisService.delete(key);
  }

  private async addItem<T extends { id: string }>(
    key: CacheKey,
    newItem: T
  ): Promise<void> {
    const items = await this.getAll<T>(key);
    if (items) {
      const updatedItems = [...items, newItem];
      await this.setAll<T>(key, updatedItems);
    } else {
      await this.setAll<T>(key, [newItem]);
    }
  }

  private async updateItem<T extends { id: string }>(
    key: CacheKey,
    updatedItem: T
  ): Promise<void> {
    const items = await this.getAll<T>(key);
    if (items) {
      const updatedItems = items.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );
      await this.setAll<T>(key, updatedItems);
    } else {
      await this.setAll<T>(key, [updatedItem]);
    }
  }

  private async deleteItem(key: CacheKey, itemId: string): Promise<void> {
    const items = await this.getAll<{ id: string }>(key);
    if (items) {
      const updatedItems = items.filter((item) => item.id !== itemId);
      await this.setAll(key, updatedItems);
    }
  }

  user = {
    getAllUsersFromCache: async (): Promise<IGetUser[] | null> => {
      return await this.getAll<IGetUser>(this.cacheKeys.user);
    },
    getSingleUserFromCache: async (
      userId: string
    ): Promise<IGetUser | null> => {
      return await this.getOne<IGetUser>(this.cacheKeys.user, userId);
    },
    setAllUsersToCache: async (users: IGetUser[]): Promise<void> => {
      await this.setAll<IGetUser>(this.cacheKeys.user, users);
    },
    addNewUserToCache: async (newUser: IGetUser): Promise<void> => {
      await this.addItem<IGetUser>(this.cacheKeys.user, newUser);
    },
    updateUserInCache: async (updatedUser: IGetUser): Promise<void> => {
      await this.updateItem<IGetUser>(this.cacheKeys.user, updatedUser);
    },
    deleteUserFromCache: async (userId: string): Promise<void> => {
      await this.deleteItem(this.cacheKeys.user, userId);
    },
    deleteAllUserFromCache: async () => {
      await this.deleteAll(this.cacheKeys.user);
    },
  };

  team = {
    getAllTeamsFromCache: async (): Promise<IGetTeam[] | null> => {
      return await this.getAll<IGetTeam>(this.cacheKeys.team);
    },
    getSingleTeamFromCache: async (
      teamId: string
    ): Promise<IGetTeam | null> => {
      return await this.getOne<IGetTeam>(this.cacheKeys.team, teamId);
    },
    setAllTeamsToCache: async (teams: IGetTeam[]): Promise<void> => {
      await this.setAll<IGetTeam>(this.cacheKeys.team, teams);
    },
    addNewTeamToCache: async (newTeam: IGetTeam): Promise<void> => {
      await this.addItem<IGetTeam>(this.cacheKeys.team, newTeam);
    },
    updateTeamInCache: async (updatedTeam: IGetTeam): Promise<void> => {
      await this.updateItem<IGetTeam>(this.cacheKeys.team, updatedTeam);
    },
    deleteTeamFromCache: async (teamId: string): Promise<void> => {
      await this.deleteItem(this.cacheKeys.team, teamId);
    },
  };

  project = {
    getAllProjectsFromCache: async (): Promise<IGetProject[] | null> => {
      return await this.getAll<IGetProject>(this.cacheKeys.project);
    },
    getSingleProjectFromCache: async (
      projectId: string
    ): Promise<IGetProject | null> => {
      return await this.getOne<IGetProject>(this.cacheKeys.project, projectId);
    },
    setAllProjectsToCache: async (projects: IGetProject[]): Promise<void> => {
      await this.setAll<IGetProject>(this.cacheKeys.project, projects);
    },
    addNewProjectToCache: async (newProject: IGetProject): Promise<void> => {
      await this.addItem<IGetProject>(this.cacheKeys.project, newProject);
    },
    updateProjectInCache: async (
      updatedProject: IGetProject
    ): Promise<void> => {
      await this.updateItem<IGetProject>(
        this.cacheKeys.project,
        updatedProject
      );
    },
    deleteProjectFromCache: async (projectId: string): Promise<void> => {
      await this.deleteItem(this.cacheKeys.project, projectId);
    },
  };
}

export const CacheServiceInstance = new CacheService();