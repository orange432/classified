import prisma from "../utils/prisma";
import type { Project } from "@prisma/client";
import logger from "../utils/logger";

type ProjectDetails = Omit<Project, "projectId" | "createdAt" | "updatedAt">;

export const getAllProjects = async () => {
  try {
    const projects = await prisma.project.findMany();
    return [projects, null];
  } catch (err) {
    logger.info(err);
    return [null, "Database error, please try again later"];
  }
}

export const getUserProjects = async (userId: number) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        userId
      }
    });
    return [projects, null];
  } catch (err) {
    logger.info(err);
    return [null, "Database error, please try again later"];
  }
}

export const getProject = async (projectId: number) => {
  try {
    const project = await prisma.project.findUnique({
      where: {
        projectId
      }
    });
    return [project, null];
  } catch (err) {
    logger.info(err);
    return [null, "Database error, please try again later"];
  }
}

export const createProject = async (project: ProjectDetails) => {
  try {
    const newProject = await prisma.project.create({
      data: project
    });
    return [newProject, null];
  } catch (err) {
    logger.info(err);
    return [null, "Database error, please try again later"];
  }
}

export const updateProject = async (projectId: number, project: ProjectDetails) => {
  try {
    const updatedProject = await prisma.project.update({
      where: {
        projectId
      },
      data: project
    });
    return [updatedProject, null];
  } catch (err) {
    logger.info(err);
    return [null, "Database error, please try again later"];
  }
}

export const deleteProject = async (projectId: number) => {
  try {
    const deletedProject = await prisma.project.delete({
      where: {
        projectId
      }
    });
    return [deletedProject, null];
  } catch (err) {
    logger.info(err);
    return [null, "Database error, please try again later"];
  }
}