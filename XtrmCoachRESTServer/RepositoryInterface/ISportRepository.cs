﻿using System.Collections;
using XtrmCoachRESTServer.Models;

namespace XtrmCoachRESTServer.RepositoryInterface
{
	public interface ISportRepository
	{
		ArrayList GetSports(long userId);
		Sport GetSport(long sportId);
		long InsertSport(Sport sport);
		bool DeleteSport(long sportId);
		bool UpdateSport(Sport sport);
	}
}