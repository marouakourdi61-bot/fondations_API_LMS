const express = require("express");

const {
    getCourses,
    getCourseById
} = require("../controllers/courseController");

const {
    getModulesByCourse
} = require("../controllers/moduleController");

const checkEnrollment = require("../middlewares/checkEnrollment");

const router = express.Router();

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Liste des cours publiés
 *     tags:
 *       - Courses
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filtrer par catégorie
 *         example: Backend
 *
 *       - in: query
 *         name: level
 *         schema:
 *           type: string
 *           enum: [beginner, intermediate, advanced]
 *         description: Filtrer par niveau
 *         example: beginner
 *
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Rechercher par titre ou description
 *         example: JavaScript
 *
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [createdAt, publishedAt]
 *         description: Trier les cours
 *         example: publishedAt
 *
 *     responses:
 *       200:
 *         description: Liste des cours récupérée avec succès
 *       500:
 *         description: Erreur interne du serveur
 */
router.get("/", getCourses);


/**
 * @swagger
 * /api/courses/{id}/modules:
 *   get:
 *     summary: Liste des modules d'un cours
 *     tags:
 *       - Modules
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du cours
 *         example: 68da12345678901234567890
 *
 *     responses:
 *       200:
 *         description: Liste des modules récupérée avec succès
 *       400:
 *         description: ID du cours invalide
 *       500:
 *         description: Erreur interne du serveur
 */
router.get("/:id/modules", checkEnrollment ,getModulesByCourse);


/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Obtenir le détail d'un cours
 *     tags:
 *       - Courses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du cours
 *         example: 68da12345678901234567890
 *
 *     responses:
 *       200:
 *         description: Détail du cours récupéré avec succès
 *       400:
 *         description: ID du cours invalide
 *       404:
 *         description: Cours introuvable
 *       500:
 *         description: Erreur interne du serveur
 */
router.get("/:id", getCourseById);


module.exports = router;