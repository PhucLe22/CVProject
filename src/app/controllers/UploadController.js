const Job = require('../models/CV');
const { mongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');
const fs = require('fs');
const UploadedFile = require('../models/CV');
const { spawn } = require('child_process');
const path = require('path');

class UploadController {
    index(req, res, next) {
        res.render('cvs/index');
    }
    // upload(req, res, next) {
    //     if (!req.file) {
    //         return res.status(400).send('Vui lòng chọn một file để upload');
    //     }

    //     const mime = req.file.mimetype;
    //     const filePath = req.file.path;
    //     const fileName = req.file.originalname;
    //     const slug = path.parse(req.file.originalname).name.toLowerCase().replace(/\s+/g, '-');

    //     if (mime === 'application/json') {
    //         try {
    //             const content = fs.readFileSync(filePath, 'utf8');
    //             const raw = JSON.parse(content);

    //             const convertData = (data) => ({
    //                 name: data.Name,
    //                 contactInformation: {
    //                     phone: data['Contact Information']?.Phone,
    //                     emailAddress: data['Contact Information']?.['Email Address'],
    //                     address: data['Contact Information']?.Address,
    //                 },
    //                 education: (data.Education || []).map(ed => ({
    //                     schoolName: ed['School Name'],
    //                     degree: ed['Degree'],
    //                     dates: ed['Dates'],
    //                     GPA: ed['GPA'] || '',
    //                 })),
    //                 workExperience: (data['Work Experience'] || []).map(exp => ({
    //                     jobTitle: exp['Job Title'],
    //                     company: exp['Company'],
    //                     dates: exp['Dates'],
    //                     responsibilities: exp['Responsibilities'] || '',
    //                 })),
    //                 skills: data.Skills || [],
    //                 projects: data.Projects || [],
    //                 achievementsAndHackathons: data['Achievements & Hackathons'] || [],
    //                 slug: slug,
    //             });

    //             if (Array.isArray(raw)) {
    //                 const mapped = raw.map(convertData);
    //                 return UploadedFile.insertMany(mapped)
    //                     .then(() => res.send('Đã lưu nhiều CV từ file JSON!'))
    //                     .catch(next);
    //             } else {
    //                 const mapped = convertData(raw);
    //                 return new UploadedFile(mapped).save()
    //                     .then(() => res.send('Đã lưu 1 CV từ file JSON!'))
    //                     .catch(next);
    //             }
    //         } catch (err) {
    //             console.error('Lỗi đọc JSON:', err);
    //             return res.status(500).send('Không thể xử lý file JSON');
    //         }
    //     }

    //     // Nếu không phải JSON (ví dụ: PDF, DOC...)
    //     const fileCV = new UploadedFile({
    //         name: fileName,
    //         slug: slug,
    //         fileUrl: filePath,
    //     });

    //     fileCV.save()
    //         .then(() => res.send('Đã lưu file không phải JSON vào MongoDB!'))
    //         .catch(next);
    // }

    upload(req, res, next) {
        if (!req.file) return res.status(400).send('Vui lòng chọn file');

        const fileUploadedPath = req.file.path;
        const pythonPath =
            '/Users/mac/Documents/NodeJSDemo/.vscode/python/ingestion.py';
        console.log('[DEBUG] Đường dẫn tới Python script:', pythonPath);
        const python = spawn('python3', [pythonPath, fileUploadedPath]);

        let result = '',
            err = '';

        python.stdout.on('data', (data) => (result += data.toString()));
        python.stderr.on('data', (data) => (err += data.toString()));

        python.on('close', (code) => {
            if (code === 0) res.send(`✅ Python trả về:\n${result}`);
            else res.status(500).send(`❌ Lỗi:\n${err}`);
        });
    }
}

module.exports = new UploadController();
