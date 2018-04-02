using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using XayDungMinhThanh.Models;

namespace XayDungMinhThanh.API
{
    public class GiaDichVuAPIController : ApiController
    {
        private MinhThanhEntities db = new MinhThanhEntities();

        // GET: api/GiaDichVuAPI
        public IQueryable<GiaDichVu> GetGiaDichVus()
        {
            return db.GiaDichVus;
        }

        // GET: api/GiaDichVuAPI/5
        [ResponseType(typeof(GiaDichVu))]
        public IHttpActionResult GetGiaDichVu(int id)
        {
            GiaDichVu giaDichVu = db.GiaDichVus.Find(id);
            if (giaDichVu == null)
            {
                return NotFound();
            }

            return Ok(giaDichVu);
        }

        // PUT: api/GiaDichVuAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutGiaDichVu(int id, GiaDichVu giaDichVu)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != giaDichVu.ID)
            {
                return BadRequest();
            }

            db.Entry(giaDichVu).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GiaDichVuExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/GiaDichVuAPI
        [ResponseType(typeof(GiaDichVu))]
        public IHttpActionResult PostGiaDichVu(GiaDichVu giaDichVu)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.GiaDichVus.Add(giaDichVu);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = giaDichVu.ID }, giaDichVu);
        }

        // DELETE: api/GiaDichVuAPI/5
        [ResponseType(typeof(GiaDichVu))]
        public IHttpActionResult DeleteGiaDichVu(int id)
        {
            GiaDichVu giaDichVu = db.GiaDichVus.Find(id);
            if (giaDichVu == null)
            {
                return NotFound();
            }

            db.GiaDichVus.Remove(giaDichVu);
            db.SaveChanges();

            return Ok(giaDichVu);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool GiaDichVuExists(int id)
        {
            return db.GiaDichVus.Count(e => e.ID == id) > 0;
        }
    }
}