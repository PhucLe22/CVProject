function normalizeCVData(raw) {
    const normalized = {};

    normalized.name = raw.Name || raw.name || 'No Name';
    const contact = raw['Contact Information'] || raw.contact || {};
    normalized.email = contact['Email Address'] || contact.email || null;
    normalized.phone = contact['Phone'] || contact.phone || null;
    normalized.address = contact['Address'] || contact.address || null;

    normalized.education = (raw.Education || []).map((edu) => ({
        school: edu['School Name'] || edu.school || '',
        degree: edu.Degree || edu.degree || '',
        field: edu.field || '',
        startYear: parseInt((edu.Dates || '').split('-')[0]) || null,
        endYear: parseInt((edu.Dates || '').split('-')[1]) || null,
        dates: edu.Dates || '',
        gpa: edu.GPA || '',
    }));

    normalized.experience = (raw['Work Experience'] || []).map((exp) => ({
        company: exp.Company || exp.company || '',
        position: exp['Job Title'] || exp.position || '',
        startDate: new Date((exp.Dates || '').split('-')[0].trim() || null),
        endDate: new Date((exp.Dates || '').split('-')[1]?.trim() || null),
        description: exp.Responsibilities || exp.description || '',
    }));

    const skillsRaw = raw.Skills || raw.skills || [];
    if (Array.isArray(skillsRaw) && skillsRaw[0]?.Skills) {
        normalized.skills = skillsRaw.flatMap((s) => s.Skills);
    } else {
        normalized.skills = skillsRaw;
    }

    normalized.projects = (raw.Projects || []).map((proj) => ({
        projectName: proj['Project Name'] || '',
        description: proj.Description || '',
        technologiesUsed: proj['Technologies Used'] || [],
        dates: proj.Dates || '',
    }));

    normalized.achievementsAndHackathons = (
        raw['Achievements & Hackathons'] || []
    ).map((ach) => ({
        details: ach.Details || '',
        type: ach.Type || '',
    }));

    return normalized;
}
